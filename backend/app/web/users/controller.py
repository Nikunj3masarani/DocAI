import uuid

from fastapi import Depends, status
from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi.responses import StreamingResponse
from app.services.db.dependency import get_db_session
from app.web.users.service import User as UserService
from app.web.users.response import UserResponse, LoginResponse, SetPasswordResponse, ForgetPasswordResponse
from app.web.users.validator import InviteUserRequest, UserCreds, SetPassword, ForgetPassword, Auth2Login
from app.middleware.auth import AuthBearer

router = InferringRouter()


@cbv(router)
class Users:
    @router.post("/invite")
    async def invite_user(
            self,
            invite_data: InviteUserRequest,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        user_service = UserService(db)
        invite_data = invite_data.__dict__
        invite_data['invited_by'] = user.get("user_uuid")
        invite_response = await user_service.create(invite_data)
        return UserResponse(
            payload=invite_response,
            message=constants.USER_INVITED,
            status=status.HTTP_200_OK,
        )

    @router.post("/login")
    async def login(
            self,
            user_creds: UserCreds,
            db=Depends(get_db_session)
    ):
        user_service = UserService(db)
        user_data_dict = user_creds.__dict__
        token = await user_service.get_access_token(user_data_dict)
        return LoginResponse(
            payload=token,
            message=constants.USER_LOGGED_IN,
            status=status.HTTP_200_OK,
        )

    @router.post("/auth2login")
    async def auth_2_login(
            self,
            auth2_data: Auth2Login,
            db=Depends(get_db_session)
    ):
        user_service = UserService(db)
        auth2_data_dict = auth2_data.__dict__
        token = await user_service.get_auth2_access_token(auth2_data_dict)
        return LoginResponse(
            payload=token,
            message=constants.USER_LOGGED_IN,
            status=status.HTTP_200_OK,
        )

    @router.get("/")
    async def get_user(
            self,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        user_service = UserService(db)
        user = await user_service.get(user.get("user_uuid"))
        return UserResponse(
            payload=user,
            message=constants.USER_FETCHED,
            status=status.HTTP_200_OK,
        )

    @router.post("/set-password")
    async def set_password(
            self,
            set_password_data: SetPassword,
            db=Depends(get_db_session)
    ) -> SetPasswordResponse:
        user_service = UserService(db)
        set_password_data = set_password_data.__dict__
        await user_service.update(set_password_data)
        return SetPasswordResponse(
            message=constants.USER_ONBOARDED_SUCCESSFULLY,
            status=status.HTTP_200_OK,
        )

    @router.post("/forget-password")
    async def forget_password(
            self,
            forget_password: ForgetPassword,
            db=Depends(get_db_session)
    ) -> ForgetPasswordResponse:
        user_service = UserService(db)
        forget_password_data = forget_password.__dict__
        await user_service.forget_password(forget_password_data)
        return ForgetPasswordResponse(
            message=constants.FORGET_PASSWORD,
            status=status.HTTP_200_OK,
        )

