from enum import Enum

ALLOWED_FILE_TYPES = ['pdf', 'html', 'txt']


class DocumentUploadStatus(Enum):
    UPLOADED = 1
    INDEXING = 2
    SUCCESS = 3
    FAILED = 4


class UserInviteAction(int, Enum):
    ONBOARDING = 1
    INDEX = 2
    FORGET_PASSWORD = 3


class InvitationStatus(int, Enum):
    SENT = 1
    REJECTED = 2
    ACCEPTED = 3


class IndexRole(int, Enum):
    OWNER = 1
    VIEWER = 2
    EDITOR = 3


SUBJECT = "Invitation to DocAI Platform"
