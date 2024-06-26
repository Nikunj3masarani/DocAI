from app.web.base.service import BaseService
from typing import Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.web.index.db_service import Index as IndexDBService
from app.web.index.es_service import Index as IndexESService
from app.web.users.db_service import Users as UserDBService
from elasticsearch import AsyncElasticsearch
from app.exception.custom import CustomException
from app.web.index.email_service import Users as UserEmailService
from app import constants


class Index(BaseService):
    def __init__(
            self,
            db_session: AsyncSession = None,
            es_client: AsyncElasticsearch = None
    ):
        self.db_session = db_session
        self.es_client = es_client

    async def create(self, data: Any, *args, **kwargs) -> Dict:
        index_es_service = IndexESService(self.es_client)
        await index_es_service.create_index(data.get("title"))
        index_db_service = IndexDBService(self.db_session)
        response = await index_db_service.insert_data(data)
        return response

    async def get(self, data: Any, *args, **kwargs) -> Dict:
        index_db_service = IndexDBService(self.db_session)
        index_data = await index_db_service.get_data_by_id(data)
        return index_data

    async def delete(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        index_result = await index_db_service.delete_data(data)
        index_es_service = IndexESService(self.es_client)
        await index_es_service.delete_index(index_result[0].title)

    async def update(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        response = await index_db_service.update_data(data)
        return response

    async def get_list(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        index_result = await index_db_service.get_all_data(data)
        return index_result

    async def get_index_users(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        index_user_list = await index_db_service.get_index_users_list(data)
        return index_user_list

    async def index_remove_user(self, data: Any, *args, **kwargs):
        if data.get('user_uuid') == data.get('remove_user_uuid'):
            raise CustomException(message=constants.INDEX_USER_CAN_NOT_REMOVE_SELF)
        index_db_service = IndexDBService(self.db_session)
        return await index_db_service.remove_user_from_index(data)

    async def index_invite_user(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        invitation_obj = await index_db_service.invite_user_for_index(data)
        index_obj = await index_db_service.get_data_by_id(data)
        
        email_data = dict()
        email_data['user_uuid'] = invitation_obj.get("user_uuid", '')
        email_data['token'] = invitation_obj.get("token", '')
        email_data['index_uuid'] = data.get("index_uuid", '')
        email_data['email'] = data.get("email", '')
        email_data['status'] = constants.InvitationStatus.SENT.value
        email_data['title'] = index_obj.get('title')
        user_email_service = UserEmailService()
        user_email_service.invite_user_for_index(email_data)
        return {}

    async def index_invite_user_v1(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        user_db_service = UserDBService(self.db_session)
        user_obj = await user_db_service.get_data_by_id(data.get('user_uuid'))
        return await index_db_service.index_user_invite_status_update_v1(
            {'user_uuid': user_obj.user_uuid,
             'index_uuid': data.get('index_uuid'),
             'role': data.get('role')}

        )

    async def index_invite_user_update(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        _ = await index_db_service.index_user_invite_status_update(data)
        return {}
    
    async def index_user_update(self, data: Any, *args, **kwargs):
        index_db_service = IndexDBService(self.db_session)
        _ = await index_db_service.index_user_role_update(data)
        return {}