from app.web.index.db_service import Index as IndexDBService
from app.web.inference.haystack_service import Inference as InferenceHaystackService
from app.web.common.chroma_document_store import ChromaDocumentStore


class Inference:
    def __init__(self, db_client, chroma_db_client, query_embeddings_function):
        self.db_client = db_client
        self.chroma_db_client = chroma_db_client
        self.query_embeddings_function = query_embeddings_function

    async def query(self, chat_request_data):
        index_db_service = IndexDBService(self.db_client)

        index_name = await index_db_service.get_index_name(chat_request_data.get('index_uuid'))
        chroma_db_store = ChromaDocumentStore(collection_name=index_name, chroma_client=self.chroma_db_client)

        inference_haystack_service = InferenceHaystackService(chroma_db_store, self.query_embeddings_function)

        response_generator = inference_haystack_service.get_answer(chat_request_data.get('query'))

        return response_generator
