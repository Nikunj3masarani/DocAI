from fastapi import Depends, status
from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from app.web.user.service import UserService
from app.web.user.response import InviteResponse, AcceptInviteResponse, LoginResponse, PasswordChangeResponse, PasswordForgotResponse
from app.services.db.dependency import get_db_session
from app.services.chroma.dependency import get_chroma_client
from app.web.user.validator import InviteUser, UserCreds, PasswordChangeData, PasswordForgotData
from app.middleware.auth.auth_bearer import AuthBearer

router = InferringRouter()


@cbv(router)
class UserController:

    @router.post("/invite")
    async def invite_user(
            self,
            user_data: InviteUser,
            db=Depends(get_db_session),
            dependencies=[Depends(AuthBearer())]
    ) -> InviteResponse:
        user_service = UserService(db)
        user_data_dict = user_data.__dict__
        response = await user_service.send_invite_and_create_user(user_data_dict)
        return InviteResponse(
            payload=response,
            message=constants.INDEX_CREATED,
            status=status.HTTP_200_OK,
        )

    @router.post("/login")
    async def login(
            self,
            user_creds: UserCreds,
            db=Depends(get_db_session)
    ) -> LoginResponse:
        user_service = UserService(db)
        user_data_dict = user_creds.__dict__
        token = await user_service.get_access_token(user_data_dict)
        return LoginResponse(
            payload={
                "access_token": token
            },
            message=constants.TOKEN_CREATED,
            status=status.HTTP_200_OK,
        )

    @router.post("/change/password")
    async def change_password(
            self,
            pwd_data: PasswordChangeData,
            db=Depends(get_db_session)
    ) -> PasswordChangeResponse:
        user_service = UserService(db)
        pwd_data_dict = pwd_data.__dict__
        await user_service.change_password(pwd_data_dict)
        return PasswordChangeResponse(
            message=constants.PASSWORD_CHANGE_SUCCESSFULL,
            status=status.HTTP_200_OK,
        )

    @router.post("/forgot/password")
    async def forgot_password(
            self,
            pwd_data: PasswordForgotData,
            db=Depends(get_db_session)
    ) -> PasswordForgotResponse:
        user_service = UserService(db)
        pwd_data_dict = pwd_data.__dict__
        token = await user_service.forgot_password(pwd_data_dict)
        return PasswordForgotResponse(
            message=constants.FORGOT_PASS_EMAIL_SENT,
            status=status.HTTP_200_OK,
        )
