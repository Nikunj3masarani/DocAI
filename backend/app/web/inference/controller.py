from fastapi import Depends, status
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi.responses import StreamingResponse
from app import constants
from app.services.db.dependency import get_db_session
from app.web.inference.service import Inference as InferenceService
from app.services.embeddings.dependency import get_query_embedding_function, get_rank_function
from app.web.inference.validator import ChatRequest
from app.web.inference.response import ChatHistoryResponse
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

    @router.get("/")
    async def get_chat_list(
            self,
            db=Depends(get_db_session)
    ):
        inference_service = InferenceService(db)

        chat_history_response = await inference_service.get_chat_history()
        return ChatHistoryResponse(
            payload=chat_history_response,
            message=constants.INDEX_LIST_FETCHED,
            status=status.HTTP_200_OK,
        )
