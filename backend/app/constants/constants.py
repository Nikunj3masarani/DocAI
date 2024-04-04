from enum import Enum

ALLOWED_FILE_TYPES = ['pdf', 'html', 'txt']


class DocumentUploadStatus(Enum):
    UPLOADED = 1
    INDEXING = 2
    SUCCESS = 3
    FAILED = 4
