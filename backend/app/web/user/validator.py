from pydantic import BaseModel, constr, validator, EmailStr
from typing import Optional, List
import re
from app.exception.custom import CustomException


class InviteUser(BaseModel):
    invite_email: EmailStr

    # @validator('invite_email')
    # def check_no_spaces(cls, v):
    #     regex = re.compile(r'^[a-zA-Z0-9_]+$')
    #     match = regex.match(v)
    #     if len(v) < 4:
    #         raise CustomException("title must contain at-least 4 character")
    #     if not bool(match):
    #         raise CustomException("only alphanumeric and _ allowed")
    #     if ' ' in v:
    #         raise CustomException('Spaces are not allowed')
    #     return v


class UserCreds(BaseModel):

    email: EmailStr
    password: str


class PasswordChangeData(BaseModel):

    email: EmailStr
    new_password: str
    old_password: str
    reset_code: str


class PasswordForgotData(BaseModel):

    email: EmailStr
