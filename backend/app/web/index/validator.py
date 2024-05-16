from pydantic import BaseModel, constr, validator
from typing import Optional, List
import re
from app.exception.custom import CustomException
from app import constants


class CreateIndex(BaseModel):
    title: str
    description: Optional[constr(strip_whitespace=True,
                                 min_length=0, max_length=512)]
    status: Optional[str]
    tags: Optional[List[str]] = []
    prompt_uuid: Optional[str]
    model: Optional[str]

    @validator('title')
    def check_no_spaces(cls, v):
        regex = re.compile(r'^[a-zA-Z0-9_]+$')
        match = regex.match(v)
        if len(v) < 4:
            raise CustomException("title must contain at-least 4 character")
        if not bool(match):
            raise CustomException("only alphanumeric and _ allowed")
        if ' ' in v:
            raise CustomException('Spaces are not allowed')
        return v


class UpdateIndex(BaseModel):
    description: Optional[constr(strip_whitespace=True,
                                 min_length=0, max_length=512)]
    status: Optional[str]
    tags: Optional[List[str]] = []
    prompt_uuid: Optional[str]
    model: Optional[str]


class IndexList(BaseModel):
    search: Optional[str] = None
    page_number: Optional[int] = None
    records_per_page: Optional[int] = None
    sort_order: Optional[str] = None
    sort_by: Optional[str] = None
    show_all: bool


class IndexRemoveUser(BaseModel):
    index_uuid: str
    remove_user_uuid: str


class IndexInviteUser(BaseModel):
    index_uuid: str
    email: str
    role: constants.IndexRole
    
class UpdateUserRole(BaseModel):
    index_uuid: str
    member_user_uuid: str
    role: constants.IndexRole


class IndexUserUpdate(BaseModel):
    token: str
    user_uuid: str
    status: constants.InvitationStatus
    index_uuid: str
