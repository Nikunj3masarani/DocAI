from fastapi import Depends, status
from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi.responses import StreamingResponse
from app.services.db.dependency import get_db_session
from app.web.models.service import Model as ModelService
from app.web.models.response import ModelListResponse
from app.middleware.auth import AuthBearer
router = InferringRouter()


@cbv(router)
class Model:
    @router.get("/list")
    async def get_all_models(
            self,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        model_service = ModelService(db)

        model_list = await model_service.get_model_list()
        return ModelListResponse(
            payload=model_list,
            message=constants.MODEL_LIST_FETCH,
            status=status.HTTP_200_OK,
        )
