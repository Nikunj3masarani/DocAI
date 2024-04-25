from typing import Any
from app.web.users.db_service import Users as UserDBService
from app.web.users.email_service import Users as UserEmailService
from app.web.base.service import BaseService
from app.web.users.helper import verify_password
from app.exception.custom import CustomException
from app import constants
from app.helper.jwt_token_helper import create_access_token

class User(BaseService):
    def __init__(self, db_client):
        self.db_client = db_client

    async def create(self, data: Any, *args, **kwargs):
        user_db_service = UserDBService(self.db_client)
        user_obj, invite_obj = await user_db_service.insert_data(data)
        
        email_data= dict()
        email_data['user_uuid'] = str(user_obj.get("user_uuid"))
        email_data['token'] = str(invite_obj.get("token"))
        email_data['email'] = str(user_obj.get("email"))
        email_data['action'] = "1"
        
        user_email_service = UserEmailService()
        user_email_service.invite_user_for_onboarding(email_data)
        return user_obj
    
    async def get_access_token(self, data, *args, **kwargs):
        user_email = data.get('email')
        user_db_service = UserDBService(self.db_client)
        user_obj = await user_db_service.get_user(user_email)
        if not user_obj.is_active:
            raise CustomException(constants.USER_NOT_ACTIVE)
        password = data.get('password')
        verify_password(password, user_obj.password)
        _data = {
            "email": user_email,
            "user_uuid": str(user_obj.user_uuid)
        }
        token = create_access_token(_data)
        return {"token": token}

    async def get(self, data: Any, *args, **kwargs):
        user_db_service = UserDBService(self.db_client)
        return await user_db_service.get_data_by_id(data)

    async def delete(self, data: Any, *args, **kwargs):
        pass

    async def get_list(self, data: Any, *args, **kwargs):
        pass

    async def forget_password(self, data: Any, *args, **kwargs):
        user_db_service = UserDBService(self.db_client)
        _ = await user_db_service.forget_password(data.get('email'))
        user_email_service = UserEmailService()
        user_email_service.forget_password(data.get('email'))

        return {}

    async def update(self, data: Any, *args, **kwargs):
        user_db_service = UserDBService(self.db_client)
        if data.get('action') == constants.UserInviteAction.ONBOARDING:
            await user_db_service.onboard_user(data)
        elif data.get('action') == constants.UserInviteAction.FORGET_PASSWORD:
            await user_db_service.reset_password(data)

