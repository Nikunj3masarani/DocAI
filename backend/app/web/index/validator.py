from pydantic import BaseModel, constr, validator
from typing import Optional, List
import re
from app.exception.custom import CustomException


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

