from fastapi import Depends
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi.responses import StreamingResponse

from app.services.db.dependency import get_db_session
from app.web.inference.service import Inference as InferenceService
from app.services.embeddings.dependency import get_query_embedding_function, get_rank_function
from app.web.inference.validator import ChatRequest

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

