from fastapi.routing import APIRouter
from app.web import docs
from app.web import index
from app.web import documents
from app.web import inference
from app.web import models
from app.web import prompts
api_router = APIRouter()
api_router.include_router(docs.router)
api_router.include_router(index.router, prefix="/index", tags=["Index Management"])
api_router.include_router(documents.router, prefix="/documents", tags=["Document Management"])
api_router.include_router(inference.router, prefix="/chat", tags=["Chat"])
api_router.include_router(models.router, prefix="/models", tags=["Models"])
api_router.include_router(prompts.router, prefix='/prompts', tags=["Prompts"])
