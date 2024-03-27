import uuid
from typing import Any, List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.web.base.db_service import DBService
from app.web.common.schema import Index as IndexTable
from app.exception import CustomException
from app.web.index.constants import IndexType
from app import constants
from sqlalchemy.future import select
from sqlalchemy import delete
from datetime import datetime


class Index(DBService):
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        """
        function to create user record in database and return dictionary
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        existing_index_query = select(IndexTable).where(IndexTable.title == data.get('title'))
        existing_index_result = await self.db_session.execute(existing_index_query)
        existing_index_result = existing_index_result.first()
        if existing_index_result:
            raise CustomException(constants.INDEX_EXISTS)
        index_obj = IndexTable()
        index_obj.index_uuid = str(uuid.uuid4())
        index_obj.title = data.get("title")
        index_obj.description = data.get("description")
        index_obj.status = "Private"
        index_obj.created_by = "Admin"
        index_obj.index_type = IndexType.DOCUMENT.value
        index_obj.tags = data.get('tags')
        index_obj.prompt_uuid = data.get("prompt_uuid")
        index_obj.model = data.get("model")
        index_obj.created_at = datetime.now()
        self.db_session.add(index_obj)
        await self.db_session.commit()
        return index_obj.__dict__

    async def get_data_by_id(self, _id: Any, *args, **kwargs) -> Dict:
        """
        function to get single user by id
        :param _id:
        :param args:
        :param kwargs:
        :return Dict:
        """
        select_index_query = select(IndexTable).where(IndexTable.index_uuid == _id)
        index_result = await self.db_session.execute(select_index_query)
        index_result = index_result.scalar_one_or_none()
        if not index_result:
            raise CustomException(constants.INDEX_NOT_FOUND)
        return index_result.__dict__

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:
        """
        function to update user data in SQL database
        :param data:
        :param args:
        :param kwargs:
        :return:
        """
        pass

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        """
        delete user data from SQL database
        :param data:
        :param args:
        :param kwargs:
        :return:
        """
        select_index_query = select(IndexTable).where(IndexTable.index_uuid == data)
        index_result = await self.db_session.execute(select_index_query)
        index_result = index_result.scalar_one_or_none()
        if not index_result:
            raise CustomException(constants.INDEX_NOT_FOUND)
        delete_index_query = delete(IndexTable).where(IndexTable.index_uuid == data)
        result = await self.db_session.execute(delete_index_query)
        return index_result.__dict__

    async def get_all_data(self, data: Any, *args, **kwargs) -> List[Dict]:
        """
        get list of user from SQL database.
        :param data:
        :param args:
        :param kwargs:
        :return:
        """
        select_index_list_query = select(IndexTable.index_uuid,
                                         IndexTable.title,
                                         IndexTable.description,
                                         IndexTable.created_at
                                         )
        index_list_result = await self.db_session.execute(select_index_list_query)
        index_list_result = list(index_list_result.all())
        return index_list_result

    async def get_index_name(self, index_uuid):
        select_index_name_query = select(IndexTable.title).where(IndexTable.index_uuid == index_uuid)
        select_index_name_result = await self.db_session.execute(select_index_name_query)
        select_index_name_result = select_index_name_result.scalar_one_or_none()
        if not select_index_name_result:
            raise CustomException(message=constants.INDEX_NOT_FOUND)
        return select_index_name_result
