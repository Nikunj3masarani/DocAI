import uuid
from typing import Any, List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.web.base.db_service import DBService
from app.web.common.schema import Users as UserTable, UserPasswordResetCodes
from app.exception import CustomException
from app import constants
from sqlalchemy.future import select
from sqlalchemy import delete
from datetime import datetime

from app.web.user.util import get_password_hash


class UserDBService:
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def insert_user(self, data: Any, *args, **kwargs) -> UserTable:
        """
        function to create user record in database and return user object
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        existing_user_query = select(UserTable).where(UserTable.email == data.get('invite_email'))
        existing_user_result = await self.db_session.execute(existing_user_query)
        existing_user_result = existing_user_result.first()
        if existing_user_result and existing_user_result[0].status == constants.UserStatus.ONBOARDED:
            raise CustomException(constants.USER_EXISTS)
        elif existing_user_result and existing_user_result[0].status == constants.UserStatus.INVITED:
            raise CustomException(constants.USER_ALREADY_INVITED)
        else:
            user_obj = UserTable()
            user_obj.user_uuid = str(uuid.uuid4())
            user_obj.email = data.get("invite_email")
            user_obj.status = constants.UserStatus.INVITED
            user_obj.created_at = datetime.now()
            self.db_session.add(user_obj)
            await self.db_session.commit()
        return user_obj

    async def get_user(self, email, *args, **kwargs) -> UserTable:
        """
        function to get and return user record from database
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        existing_user_query = select(UserTable).where(UserTable.email == email)
        existing_user_result = await self.db_session.execute(existing_user_query)
        existing_user_result = existing_user_result.first()
        if not existing_user_result:
            raise CustomException(constants.USER_DOES_NOT_EXISTS)

        return existing_user_result[0]

    async def change_password(self, user, password, *args, **kwargs):
        """
        function to change user's password
        :param data:
        :param args:
        :param kwargs:
        :return Dict:
        """
        pass_hash = get_password_hash(password)
        user.password = pass_hash
        await self.db_session.commit()

    async def insert_reset_code(self, user_uuid, reset_code, *args, **kwargs):
        reset_code_obj = UserPasswordResetCodes()
        reset_code_obj.code_uuid = str(uuid.uuid4())
        reset_code_obj.user_uuid = str(user_uuid)
        reset_code_obj.reset_code = reset_code
        self.db_session.add(reset_code_obj)
        await self.db_session.commit()

    async def get_user_reset_codes(self, user_uuid, *args, **kwargs):
        reset_codes_query = select(UserPasswordResetCodes).where(UserPasswordResetCodes.user_uuid == user_uuid)
        reset_codes_result = await self.db_session.execute(reset_codes_query)
        reset_codes = reset_codes_result.all()
        if not reset_codes:
            raise CustomException(constants.NO_RESET_CODES)

        return reset_codes

    async def delete_user_reset_codes(self, user_uuid, *args, **kwargs):
        delete_query = delete(UserPasswordResetCodes).where(UserPasswordResetCodes.user_uuid == user_uuid)
        await self.db_session.execute(delete_query)
        await self.db_session.commit()
