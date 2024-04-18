import uuid
from app import constants
from app.web.documents.db_service import Documents as DocumentsDBService
from app.constants import DocumentUploadStatus
from app.web.index.db_service import Index as IndexDBService
from app.web.documents.haystack_service import Documents as DocumentHaystackService
from app.exception.custom import CustomException


class Documents:
    def __init__(self, db_client, document_embedding_function=None):
        self.db_client = db_client
        self.document_embedding_function = document_embedding_function

    async def index_documents(self, documents, **kwargs):
        response_messages = {
            "success": [],
            "failed": []
        }
        document_db_service = DocumentsDBService(self.db_client)
        index_db_service = IndexDBService(self.db_client)
        index_name = await index_db_service.get_index_name(kwargs)

        document_haystack_service = DocumentHaystackService(index_name, self.document_embedding_function)

        for doc in documents:
            file_ext = doc.filename.split(".")[-1]
            if file_ext not in constants.ALLOWED_FILE_TYPES:
                raise CustomException(message=constants.DOCUMENT_TYPE_NOT_ALLOWED)

            is_exists = await document_db_service.check_file_exists(kwargs.get("index_uuid"), doc.filename)
            if is_exists:
                response_messages["failed"].append(f"{doc.filename} already indexed.")
                continue

            source_id = await document_haystack_service.index_document(doc)
            # todo store this ${doc_ids} to the database for delete document from chroma

            doc_data = {
                "index_uuid": kwargs.get("index_uuid"),
                "source_id":source_id,
                "file_name": doc.filename,
                "document_uuid": str(uuid.uuid4()),
                "file_ext": doc.filename.split(".")[-1],
                "url": "",
                "upload_status": DocumentUploadStatus.UPLOADED.value
            }
            await document_db_service.insert_data(doc_data)
            response_messages["success"].append(f"{doc.filename} indexed successfully.")

        return {"status": response_messages}

    async def get_all_documents(self, data):
        document_db_service = DocumentsDBService(self.db_client)
        return await document_db_service.get_all_data(data)

    async def delete_documents(self, document_delete_data):
        document_db_service = DocumentsDBService(self.db_client)
        data = await document_db_service.delete_data(document_delete_data)
        
        document_db_service = DocumentsDBService(self.db_client)
        index_db_service = IndexDBService(self.db_client)
        
        index_data={
            "index_uuid": data.get("index_uuid"),
            "user_uuid": document_delete_data.get("user_uuid")
        }
        index_name = await index_db_service.get_index_name(index_data)
        document_haystack_service = DocumentHaystackService(index_name, self.document_embedding_function)
        if data.get("source_id"):
            await document_haystack_service.delete_document(data.get("source_id"))

        # print(is_deleted)
        return {}