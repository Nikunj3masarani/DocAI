from fastapi import Depends, status
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi.responses import StreamingResponse
from app import constants
from app.services.db.dependency import get_db_session
from app.web.inference.service import Inference as InferenceService
from app.services.embeddings.dependency import get_query_embedding_function, get_rank_function
from app.web.inference.validator import ChatRequest, UpdateChat
from app.web.inference.response import ChatHistoryResponse, ChatMessageResponse
router = InferringRouter()


@cbv(router)
class Inference:
    @router.post("/")
    async def chat(
            self,
            chat_request: ChatRequest,
            db=Depends(get_db_session),
            query_embeddings_function=Depends(get_query_embedding_function),
            rank_function=Depends(get_rank_function)
    ):
        inference_service = InferenceService(db, query_embeddings_function, rank_function)
        chat_request_data = chat_request.__dict__
        response_generator = await inference_service.query(chat_request_data)
        return StreamingResponse(response_generator(), media_type="text/event-stream")

    @router.get("/list")
    async def get_chat_list(
            self,
            db=Depends(get_db_session)
    ):
        inference_service = InferenceService(db)

        chat_history_response = await inference_service.get_chat_history()
        return ChatHistoryResponse(
            payload=chat_history_response,
            message=constants.CHAT_FETCHED,
            status=status.HTTP_200_OK,
        )

    @router.put("/")
    async def update_chat(
            self,
            chat_uuid: str,
            chat_data: UpdateChat,
            db=Depends(get_db_session)
    ):
        inference_service = InferenceService(db)
        chat_data = chat_data.__dict__
        chat_data['chat_uuid'] = chat_uuid
        chat_update_response = await inference_service.update_chat(chat_data)
        return ChatHistoryResponse(
            payload=chat_update_response,
            message=constants.CHAT_UPDATED,
            status=status.HTTP_200_OK,
        )

    @router.delete("/")
    async def delete_chat(
            self,
            chat_uuid: str,
            db=Depends(get_db_session)
    ):
        inference_service = InferenceService(db)
        chat_delete_response = await inference_service.delete_chat(chat_uuid)
        return ChatHistoryResponse(
            payload=chat_delete_response or {},
            message=constants.CHAT_DELETED,
            status=status.HTTP_200_OK,
        )

    @router.get("/")
    async def get_chat_messages(
            self,
            chat_uuid: str,
            db=Depends(get_db_session)
    ):
        inference_service = InferenceService(db)
        chat_message_response = await inference_service.get_chat_messages(chat_uuid)
        return ChatMessageResponse(
            payload=chat_message_response,
            message=constants.CHAT_MESSAGES_FOUND,
            status=status.HTTP_200_OK,
        )
