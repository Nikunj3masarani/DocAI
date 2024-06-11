from pydantic import BaseModel, constr, validator, EmailStr
from typing import Optional, List
import re
from app.exception.custom import CustomException
from app.constants import UserInviteAction


class InviteUserRequest(BaseModel):
    email: str
    action: UserInviteAction


class Auth2Login(BaseModel):
    access_token: str
    code_verifier: str


class UserCreds(BaseModel):
    email: EmailStr
    password: str


class SetPassword(BaseModel):
    user_uuid: str
    full_name: Optional[str]
    password: str
    token: str
    action: UserInviteAction


class ForgetPassword(BaseModel):
    email: EmailStr
