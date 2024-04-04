import uuid
from functools import partial
import asyncio
import anyio
from app.web.index.db_service import Index as IndexDBService
from app.web.inference.haystack_service import Inference as InferenceHaystackService
from app.web.common.chroma_document_store import ChromaDocumentStore
from app.web.models.db_service import Model as ModelDBService
from app.web.inference.db_service import Inference as InferenceDBService


class Inference:
    def __init__(self, db_client, query_embeddings_function=None, rank_function=None):
        self.db_client = db_client
        self.query_embeddings_function = query_embeddings_function
        self.rank_function = rank_function

    async def query(self, chat_request_data):

        model_db_service = ModelDBService(self.db_client)
        model_details = await model_db_service.get_data_by_id(chat_request_data.get("model_uuid"))

        index_db_service = IndexDBService(self.db_client)
        index_name = await index_db_service.get_index_name(chat_request_data.get("index_uuid"))

        inference_db_service = InferenceDBService(self.db_client)

        tokens = []

        async def inference_callback(token):
            for choice in token.choices:
                tokens.append(choice.delta.content or '')

                if choice.finish_reason == "stop":
                    response_text = ''.join(tokens)
                    chat_data = {
                        "message_uuid": uuid.uuid4(),
                        "user_message": chat_request_data.get("query"),
                        "assistant_message": response_text,
                        "index_uuid": chat_request_data.get("index_uuid"),
                        "model_uuid": chat_request_data.get("model_uuid"),
                        "prompt_uuid": chat_request_data.get("prompt_uuid"),
                        "chat_uuid": chat_request_data.get("chat_uuid"),
                        "user_uuid": "abcd"
                    }
                    await inference_db_service.add_data(chat_data)

        inference_haystack_service = InferenceHaystackService(index_name,
                                                              self.query_embeddings_function,
                                                              model_details,
                                                              self.rank_function, inference_callback)

        response_generator = inference_haystack_service.get_answer(chat_request_data.get('query'))

        return response_generator

    async def get_chat_history(self):
        inference_db_service = InferenceDBService(self.db_client)
        return await inference_db_service.get_all_data({})