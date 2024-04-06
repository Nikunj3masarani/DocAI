import uuid
from app.web.base.service import BaseService
from typing import Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession

from app.exception import CustomException
from app.web.user.db_service import UserDBService
from app.web.user.util import verify_password
from app.services.email.send_email import send_email
from app import constants
from app.middleware.auth.jwt_token_handler import create_access_token


class UserService:
    def __init__(
            self,
            db_session: AsyncSession = None
    ):
        self.db_session = db_session

    async def send_invite_and_create_user(self, data: Any, *args, **kwargs) -> Dict:
        """
        function to store user data in DB
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        email = data.get('email')
        # Generate reset code
        reset_code = str(uuid.uuid4())
        # Send invite mail
        send_email(email, "Test Subject", "Test Content - {}".format(reset_code))

        # Persist user data
        user_db_service = UserDBService(self.db_session)
        user_obj = await user_db_service.insert_user(data)

        
        return user_obj.__dict__

    async def get_access_token(self, data, *args, **kwargs) -> Dict:
        """
        function to create access token
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        user_email = data.get('email')
        user_db_service = UserDBService(self.db_session)
        user_obj = await user_db_service.get_user(user_email)

        # Verify Password
        password = data.get('password')
        verify_password(password, user_obj.password)
        _data = {
            "email": user_email,
            "user_uuid": str(user_obj.user_uuid)
        }
        token = create_access_token(_data)

        return token

    async def change_password(self, data, *args, **kwargs):
        """
        function to change a user's password
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        user_email = data.get('email')
        user_db_service = UserDBService(self.db_session)
        user_obj = await user_db_service.get_user(user_email)

        change_to_new = False
        reset_code = data.get('reset_code')
        user_reset_code = None
        new_password = data.get('new_password')
        old_password = data.get('old_password')
        reset_codes = await user_db_service.get_user_reset_codes(user_obj.user_uuid)
        for obj in reset_codes[0]:
            if obj.reset_code == reset_code:
                user_reset_code = obj
                break

        if user_obj.status == constants.UserStatus.INVITED and not user_obj.password:
            change_to_new = True

        elif user_obj.status == constants.UserStatus.ONBOARDED and verify_password(old_password, user_obj.password):
            change_to_new = True

        else:
            raise CustomException(constants.UNAUTHORIZED_PASSWORD_CHANGE)

        if reset_code != user_reset_code.reset_code:
            raise CustomException(constants.WRONG_RESET_CODE)

        if change_to_new:
            await user_db_service.change_password(user_obj, new_password)
            await user_db_service.delete_user_reset_codes(user_obj.user_uuid)

    async def forgot_password(self, data, *args, **kwargs):
        """
        function for forgot password flow
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        # Get User
        user_email = data.get('email')
        user_db_service = UserDBService(self.db_session)
        user_obj = await user_db_service.get_user(user_email)

        # Verify User status
        if user_obj.status != constants.UserStatus.ONBOARDED:
            raise CustomException(constants.BAD_REQUEST)

        # Generate reset code
        reset_code = str(uuid.uuid4())

        # Send reset email
        send_email(user_obj.email, "Reset Password", "Reset code - {}".format(reset_code))
        # Save reset code
        await user_db_service.insert_reset_code(user_obj.user_uuid, reset_code)
