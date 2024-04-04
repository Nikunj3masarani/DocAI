from fastapi import Depends, status
from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from app.web.documents.service import Documents as DocumentService
from app.web.documents.response import DocumentResponse
from app.services.db.dependency import get_db_session
from app.services.es.dependency import get_es_client
from app.services.embeddings.dependency import get_documents_embedding_function
from typing import List
from fastapi import UploadFile
from pydantic import UUID4
router = InferringRouter()


@cbv(router)
class Documents:
    @router.post("/upload")
    async def upload_document(
            self,
            index_uuid: str,
            documents: List[UploadFile],
            db=Depends(get_db_session),
            document_embeddings=Depends(get_documents_embedding_function)
    ) -> DocumentResponse:
        document_service = DocumentService(db, document_embeddings)
        response = await document_service.index_documents(documents, index_uuid=index_uuid)
        return DocumentResponse(
            payload=response,
            message=constants.DOCUMENT_UPLOADED,
            status=status.HTTP_200_OK,
        )

    @router.post('/list')
    async def get_documents(self,
                            index_uuid: str,
                            db=Depends(get_db_session)) -> DocumentResponse:
        document_service = DocumentService(db)
        documents_list = await document_service.get_all_documents(index_uuid=index_uuid)
        return DocumentResponse(
            payload={"documents": documents_list},
            message=constants.DOCUMENTS_FETCHED_SUCCESSFULLY,
            status=status.HTTP_200_OK,
        )

    @router.delete('/')
    async def delete_document(self, document_uuid: str, db=Depends(get_db_session)) -> DocumentResponse:
        document_service = DocumentService(db)
        _ = await document_service.delete_documents(document_uuid=document_uuid)
        return DocumentResponse(
            payload={},
            message=constants.DOCUMENTS_FETCHED_SUCCESSFULLY,
            status=status.HTTP_200_OK,
        )
