from pydantic import BaseModel, constr, validator
from typing import Optional, List
import re
from app.exception.custom import CustomException


class CreatePrompt(BaseModel):
    title: str
    description: constr(strip_whitespace=True,
                        min_length=0, max_length=512)
    status: Optional[str]


class UpdatePrompt(BaseModel):
    title: Optional[str]
    description: Optional[constr(strip_whitespace=True,
                                 min_length=0, max_length=512)]
    status: Optional[str]


class PromptList(BaseModel):
    search: Optional[str] = None
    page_number: Optional[int] = None
    records_per_page: Optional[int] = None
    sort_order: Optional[str] = None
    sort_by: Optional[str] = None
    show_all: bool
