from enum import Enum


class DocumentUploadStatus(Enum):
    UPLOADED = 1
    INDEXING = 2
    SUCCESS = 3
    FAILED = 4


class UserStatus(Enum):

    INVITED = "INVITED"
    INVITE_REJECTED = "INVITE_REJECTED"
    ONBOARDED = "ONBOARDED"
