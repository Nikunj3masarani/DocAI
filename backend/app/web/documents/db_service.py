from typing import Any, List, Dict
from sqlalchemy.future import select
from sqlalchemy import and_
from app import constants
from app.web.base.db_service import DBService
from app.web.common.schema import Documents as DocumentTable
from app.web.common.schema import Index as IndexTable
from app.exception.custom import CustomException

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

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        pass

    async def get_all_data(self, data: Any, *args, **kwargs) -> List[Dict]:
        pass
