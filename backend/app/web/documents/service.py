import uuid

from app.web.documents.db_service import Documents as DocumentsDBService
from app.web.documents.chroma_db_service import Documents as DocumentsChromaDBService
from app.constants.constants import DocumentUploadStatus
from app.web.index.db_service import Index as IndexDBService
from app.web.documents.haystack_service import Documents as DocumentHaystackService
from app.web.documents.chroma_db_service import Documents as DocumentChromaDBService
from app.web.common.chroma_document_store import ChromaDocumentStore


class Documents:
    def __init__(self, db_client, chroma_client, document_embedding_function):
        self.db_client = db_client
        self.chroma_client = chroma_client
        self.document_embedding_function = document_embedding_function

    async def index_documents(self, documents, **kwargs):
        response_messages = {
            "success": [],
            "failed": []
        }
        document_db_service = DocumentsDBService(self.db_client)
        index_db_service = IndexDBService(self.db_client)
        index_name = await index_db_service.get_index_name(kwargs.get("index_uuid"))

        chroma_document_store = ChromaDocumentStore(
            collection_name=index_name,
            chroma_client=self.chroma_client
        )
        document_haystack_service = DocumentHaystackService(chroma_document_store, self.document_embedding_function)

        for doc in documents:
            is_exists = await document_db_service.check_file_exists(kwargs.get("index_uuid"), doc.filename)
            if is_exists:
                response_messages["failed"].append(f"{doc.filename} already indexed.")
                continue

            _ = await document_haystack_service.index_document(doc)
            # todo store this ${doc_ids} to the database for delete document from chroma

            doc_data = {
                "index_uuid": kwargs.get("index_uuid"),
                "file_name": doc.filename,
                "document_uuid": str(uuid.uuid4()),
                "file_ext": doc.filename.split(".")[-1],
                "url": "",
                "upload_status": DocumentUploadStatus.UPLOADED.value
            }
            await document_db_service.insert_data(doc_data)
            response_messages["success"].append(f"{doc.filename} indexed successfully.")

        return {"status": response_messages}
