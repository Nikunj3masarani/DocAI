import uuid
from typing import Any, List, Dict
from sqlalchemy.future import select
from sqlalchemy import and_, delete, cast, String
from app import constants
from app.web.base.db_service import DBService
from app.web.common.schema import Documents as DocumentTable
from app.web.common.schema import IndexUserMapping as IndexUserMappingTable
from app.web.common.schema import Index as IndexTable
from app.exception.custom import CustomException
from uuid import UUID


class Documents(DBService):
    def __init__(self, db_client):
        self.db_client = db_client

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        doc_table = DocumentTable(**data)
        self.db_client.add(doc_table)
        await self.db_client.commit()

    async def check_file_exists(self, index_uuid, file_name):
        select_file_exists_query = select(DocumentTable).where(and_(
            DocumentTable.index_uuid == index_uuid,
            DocumentTable.file_name == file_name
        ))

        select_file_exists_result = await self.db_client.execute(select_file_exists_query)
        select_file_exists_result = list(select_file_exists_result.all())
        if select_file_exists_result:
            return True
        return False

    async def get_data_by_id(self, _id: Any, *args, **kwargs) -> Dict:
        pass

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:
        pass

    async def delete_data(self, data: Any, *args, **kwargs) -> Dict:
        select_document_query = select(DocumentTable).where(DocumentTable.document_uuid == data.get("document_uuid"))
        document_result = await self.db_client.execute(select_document_query)
        document_result = document_result.scalar_one_or_none()
        if not document_result:
            raise CustomException(constants.DOCUMENT_NOT_FOUND)
        can_delete_document_check_query = select(IndexTable, IndexUserMappingTable.role).join(
            IndexUserMappingTable, IndexUserMappingTable.index_uuid == IndexTable.index_uuid).where(
            IndexTable.index_uuid == document_result.index_uuid,
            IndexUserMappingTable.user_uuid == data.get("user_uuid")
        )

        can_delete_document_result = await self.db_client.execute(can_delete_document_check_query)
        can_delete_document_result = can_delete_document_result.first()
        if not can_delete_document_result:
            raise CustomException(constants.DOCUMENT_CAN_NOT_DELETED)
        elif can_delete_document_result.role != constants.IndexRole.OWNER:
            raise CustomException(constants.DOCUMENT_CAN_NOT_DELETED)

        delete_document_query = delete(DocumentTable).where(DocumentTable.document_uuid == data.get("document_uuid"))
        _ = await self.db_client.execute(delete_document_query)
        return document_result.__dict__

    async def get_all_data(self, data: Any, *args, **kwargs) -> List[Dict]:
        index_access_check_query = select(IndexTable).join(IndexUserMappingTable,
                                                           IndexUserMappingTable.index_uuid == IndexTable.index_uuid).where(
            IndexTable.index_uuid == data.get("index_uuid"),
            IndexUserMappingTable.user_uuid == data.get("user_uuid")
        )
        index_access_result = await self.db_client.execute(index_access_check_query)
        index_access_result = index_access_result.first()
        if not index_access_result:
            raise CustomException(constants.INDEX_CANT_ACCESS)

        document_list_query = select(DocumentTable.document_uuid,
                                     DocumentTable.file_name,
                                     DocumentTable.file_ext,
                                     DocumentTable.url,
                                     DocumentTable.created_at,
                                     DocumentTable.created_by).where(DocumentTable.index_uuid == data.get("index_uuid"))

        document_list_result = await self.db_client.execute(document_list_query)
        document_list_result = list(document_list_result.all())
        return document_list_result
