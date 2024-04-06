from pydantic import BaseModel, constr, validator, EmailStr
from typing import Optional, List
import re
from app.exception.custom import CustomException


class InviteUser(BaseModel):
    invite_email: EmailStr


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
