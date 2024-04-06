from fastapi.routing import APIRouter
from app.web import docs
from app.web import index
from app.web import documents
from app.web import inference
from app.web import user


api_router = APIRouter()
api_router.include_router(docs.router)
api_router.include_router(index.router, prefix="/index", tags=["Index Management"])
api_router.include_router(documents.router, prefix="/documents", tags=["Document Management"])
api_router.include_router(inference.router, prefix="/inference", tags=["Inference"])
api_router.include_router(user.router, prefix="/user", tags=["User"])
