from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class UserIdentity(BaseModel):
    user_id: UUID
    email: Optional[str] = None
    username: Optional[str] = None
    status: Optional[str] = None
