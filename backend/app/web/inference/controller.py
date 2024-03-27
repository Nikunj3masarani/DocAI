from fastapi import Depends, status
from starlette.responses import StreamingResponse

from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi.responses import StreamingResponse
from app.web.index.validator import CreateIndex
from app.web.index.response import IndexResponse, IndexListResponse
from app.services.db.dependency import get_db_session
from app.services.chroma.dependency import get_chroma_client
from app.web.inference.service import Inference as InferenceService
from app.services.embeddings.dependency import get_query_embedding_function
from app.web.inference.validator import ChatRequest

router = InferringRouter()


@cbv(router)
class Inference:
    @router.post("/")
    async def chat(
            self,
            chat_request: ChatRequest,
            db=Depends(get_db_session),
            chroma_client=Depends(get_chroma_client),
            query_embeddings_function=Depends(get_query_embedding_function)
    ):
        inference_service = InferenceService(db, chroma_client, query_embeddings_function)
        chat_request_data = chat_request.__dict__
        response_generator = await inference_service.query(chat_request_data)
        return StreamingResponse(response_generator(), media_type="text/event-stream")
