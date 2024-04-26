import uuid
from typing import Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.web.base.db_service import DBService
from app.exception import CustomException
from app import constants
from sqlalchemy.future import select
from app.web.common.schema import User as UserTable
from app.web.users.helper import get_password_hash
from app.web.common.schema import Invitation as InviteTable
from datetime import datetime


class Users(DBService):
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        select_user_exists = select(UserTable.user_uuid,
                                    UserTable.email,
                                    UserTable.is_active,
                                    InviteTable.status,
                                    InviteTable.created_at).outerjoin(InviteTable,
                                                                      InviteTable.user_uuid == UserTable.user_uuid,
                                                                      InviteTable.invite_action == constants.UserInviteAction.ONBOARDING).where(
            UserTable.email == data.get('email'))
        user_exists_result = await self.db_session.execute(select_user_exists)
        user_obj = user_exists_result.first()
        if user_obj and user_obj.is_active:
            raise CustomException(constants.USER_EXISTS)
        elif user_obj and user_obj.status == constants.InvitationStatus.SENT:
            raise CustomException(constants.USER_ALREADY_INVITED)
        else:
            invite_uuid = uuid.uuid4()
            user_obj = UserTable()
            user_obj.user_uuid = uuid.uuid4()
            user_obj.email = data.get("email")
            user_obj.created_at = datetime.utcnow()
            user_obj.is_active = False
            user_obj.updated_at = datetime.utcnow()
            user_obj.full_name = ""
            user_obj.image_url = ""
            user_obj.invitation_uuid = invite_uuid
            invitation_token = str(uuid.uuid4())
            invitation_obj = InviteTable()
            invitation_obj.created_at = datetime.utcnow()
            invitation_obj.invite_uuid = invite_uuid
            invitation_obj.status = constants.InvitationStatus.SENT.value
            invitation_obj.token = invitation_token
            invitation_obj.invited_by = data.get('invited_by')
            invitation_obj.user_uuid = user_obj.user_uuid
            invitation_obj.invite_action = constants.UserInviteAction.ONBOARDING.value
            self.db_session.add(user_obj)
            await self.db_session.commit()
            self.db_session.add(invitation_obj)
            await self.db_session.commit()

        return user_obj.__dict__ , invitation_obj.__dict__

    async def get_data_by_id(self, _id: Any, *args, **kwargs) -> Dict:
        existing_user_query = select(UserTable.user_uuid,
                                     UserTable.email,
                                     UserTable.is_active,
                                     UserTable.full_name,
                                     UserTable.created_at).where(UserTable.user_uuid == _id)
        existing_user_result = await self.db_session.execute(existing_user_query)
        existing_user_result = existing_user_result.first()
        if not existing_user_result:
            raise CustomException(constants.USER_DOES_NOT_EXISTS)
        return existing_user_result

    async def get_user(self, email, *args, **kwargs) -> UserTable:
        existing_user_query = select(UserTable.user_uuid, UserTable.email, UserTable.password,
                                     UserTable.is_active).where(UserTable.email == email)
        existing_user_result = await self.db_session.execute(existing_user_query)
        existing_user_result = existing_user_result.first()
        if not existing_user_result:
            raise CustomException(constants.USER_DOES_NOT_EXISTS)
        return existing_user_result

    async def forget_password(self, email):
        existing_user_query = select(UserTable.user_uuid, UserTable.email, UserTable.password,
                                     UserTable.is_active).where(UserTable.email == email)
        existing_user_result = await self.db_session.execute(existing_user_query)
        existing_user_result = existing_user_result.first()
        if not existing_user_result:
            raise CustomException(constants.USER_DOES_NOT_EXISTS)
        elif not existing_user_result.is_active:
            raise CustomException(constants.USER_NOT_ONBOARDED)
        invitation_obj = InviteTable()
        invitation_obj.created_at = datetime.utcnow()
        invitation_obj.invite_uuid = uuid.uuid4()
        invitation_obj.status = constants.InvitationStatus.SENT.value
        invitation_obj.token = str(uuid.uuid4())
        invitation_obj.invited_by = None
        invitation_obj.invite_action = constants.UserInviteAction.FORGET_PASSWORD.value
        invitation_obj.user_uuid = existing_user_result.user_uuid
        self.db_session.add(invitation_obj)
        return existing_user_result, invitation_obj

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:
        pass

    async def onboard_user(self, data: Any, *args, **kwargs) -> Dict:
        select_user_query = select(UserTable).where(
            UserTable.user_uuid == data.get("user_uuid"))

        user_result = await self.db_session.execute(select_user_query)
        user_result = user_result.first()
        if not user_result:
            raise CustomException(constants.USER_DOES_NOT_EXISTS)
        if user_result[0].is_active:
            raise CustomException(constants.USER_ALREADY_ACTIVE)

        select_invitation_query = select(InviteTable).where(InviteTable.token == data.get("token"),
                                                            InviteTable.user_uuid == data.get('user_uuid'))
        invitation_result = await self.db_session.execute(select_invitation_query)
        invitation_result = invitation_result.first()

        if not invitation_result:
            raise CustomException(constants.USER_INVALID_INVITATION)

        invitation_result[0].status = constants.InvitationStatus.ACCEPTED.value
        invitation_result[0].token = None
        user_result[0].password = get_password_hash(data.get('password'))
        user_result[0].full_name = data.get('full_name')
        user_result[0].is_active = True
        await self.db_session.commit()
        return dict(user_result)

    async def reset_password(self, data: Any, *args, **kwargs) -> Dict:
        select_user_query = select(UserTable).where(
            UserTable.user_uuid == data.get("user_uuid"))

        user_result = await self.db_session.execute(select_user_query)
        user_result = user_result.first()
        if not user_result:
            raise CustomException(constants.USER_DOES_NOT_EXISTS)

        select_invitation_query = select(InviteTable).where(InviteTable.token == data.get("token"),
                                                            InviteTable.user_uuid == data.get('user_uuid'))
        invitation_result = await self.db_session.execute(select_invitation_query)
        invitation_result = invitation_result.first()

        if not invitation_result:
            raise CustomException(constants.USER_INVALID_INVITATION)

        invitation_result[0].status = constants.InvitationStatus.ACCEPTED.value
        invitation_result[0].token = None
        user_result[0].password = get_password_hash(data.get('password'))
        await self.db_session.commit()
        return dict(user_result)

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        pass

    async def get_all_data(self, data: Any, *args, **kwargs) -> Dict:
        pass
