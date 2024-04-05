from app.web.base.service import BaseService
from typing import Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.web.index.db_service import Index as IndexDBService
from app.web.index.es_service import Index as IndexESService
from elasticsearch import AsyncElasticsearch


class Index(BaseService):
    def __init__(
            self,
            db_session: AsyncSession = None,
            es_client: AsyncElasticsearch = None
    ):
        self.db_session = db_session
        self.es_client = es_client

    async def create(self, data: Any, *args, **kwargs) -> Dict:
        """
        function to store user data in DB, indexes data in ES and set data in Redis
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        index_es_service = IndexESService(self.es_client)
        await index_es_service.create_index(data.get("title"))
        index_db_service = IndexDBService(self.db_session)
        response = await index_db_service.insert_data(data)
        return response

    async def get(self, data: Any, *args, **kwargs) -> Dict:
        """
        functon returns user data from DB
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        index_db_service = IndexDBService(self.db_session)
        index_data = await index_db_service.get_data_by_id(data)
        return index_data

    async def delete(self, data: Any, *args, **kwargs):
        """
        function to delete user from system
        :param data:
        :param args:
        :param kwargs:
        :return:
        """
        index_db_service = IndexDBService(self.db_session)
        index_result = await index_db_service.delete_data(data)
        index_es_service = IndexESService(self.es_client)
        await index_es_service.delete_index(index_result.get("title"))

    async def update(self, data: Any, *args, **kwargs):
        """
        function to update user.
        :param data:
        :param args:
        :param kwargs:
        :return:
        """
        pass

    async def get_list(self, data: Any, *args, **kwargs):
        """
        function to get list of all users
        :param data:
        :param args:
        :param kwargs:
        :return:
        """
        index_db_service = IndexDBService(self.db_session)
        index_result = await index_db_service.get_all_data(data)
        return index_result
