from enum import Enum


class DocumentUploadStatus(Enum):
    UPLOADED = 1
    INDEXING = 2
    SUCCESS = 3
    FAILED = 4
