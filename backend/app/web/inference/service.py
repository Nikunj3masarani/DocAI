import uuid
from app.web.index.db_service import Index as IndexDBService
from app.web.inference.haystack_service import Inference as InferenceHaystackService
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
        index_name = await index_db_service.get_index_name(chat_request_data)

        inference_db_service = InferenceDBService(self.db_client)

        chat_history = await inference_db_service.get_chat_history(chat_request_data.get('chat_uuid'))

        tokens = []
        chat_data = {
            "user_message": chat_request_data.get("query"),
            "index_uuid": chat_request_data.get("index_uuid"),
            "model_uuid": chat_request_data.get("model_uuid"),
            "chat_uuid": chat_request_data.get("chat_uuid"),
            "user_uuid": chat_request_data.get('user_uuid')
        }
        await inference_db_service.add_chat_data(chat_data)

        async def inference_callback(token):
            for choice in token.choices:
                tokens.append(choice.delta.content or '')

                if choice.finish_reason == "stop":
                    response_text = ''.join(tokens)
                    chat_history_data = {
                        "message_uuid": uuid.uuid4(),
                        "user_message": chat_request_data.get("query"),
                        "assistant_message": response_text,
                        "chat_uuid": chat_request_data.get("chat_uuid"),
                        "user_uuid": chat_request_data.get('user_uuid')
                    }
                    await inference_db_service.add_chat_history_data(chat_history_data)

        inference_haystack_service = InferenceHaystackService(index_name,
                                                              self.query_embeddings_function,
                                                              model_details,
                                                              self.rank_function, inference_callback)
        if chat_history:
            condensed_query = await inference_haystack_service.get_condense_question(chat_history,
                                                                                     chat_request_data.get('query'))

            response_generator = inference_haystack_service.get_answer(condensed_query)
        else:
            response_generator = inference_haystack_service.get_answer(chat_request_data.get('query'))

        return response_generator

    async def get_chat_history(self, user_uuid):
        inference_db_service = InferenceDBService(self.db_client)
        return await inference_db_service.get_all_data({'user_uuid': user_uuid})

    async def update_chat(self, data):
        inference_db_service = InferenceDBService(self.db_client)
        return await inference_db_service.update_data(data)

    async def delete_chat(self, data):
        inference_db_service = InferenceDBService(self.db_client)
        return await inference_db_service.delete_data(data)

    async def get_chat_messages(self, data):
        inference_db_service = InferenceDBService(self.db_client)
        return await inference_db_service.get_data_by_id(data)
