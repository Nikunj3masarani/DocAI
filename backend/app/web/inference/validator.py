
from pydantic import BaseModel, constr, validator
from typing import Optional, List
import re
from app.exception.custom import CustomException


class ChatRequest(BaseModel):
    index_uuid: str
    query: str
    model_uuid: str
    prompt_uuid: Optional[str]
    chat_uuid: str

