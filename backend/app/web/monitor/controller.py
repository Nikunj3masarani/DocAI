from fastapi import Depends, status
from app import logger
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from app.web.monitor.response import HealthResponse
from app import constants
from fastapi.requests import Request
from app.services.db.dependency import get_db_session
from app.services.es.dependency import get_es_client
router = InferringRouter()


@cbv(router)
class Monitor:
    @router.get("/health")
    async def health_check(
        self,
        request: Request,
        db=Depends(get_db_session),
        es_client=Depends(get_es_client)
    ) -> HealthResponse:
        """
        Checks the health of a project.

        It returns 200 if the project is healthy.
        """
        await db.connection()
        await es_client.ping()

        logger.info("This is sample log")
        return HealthResponse(
            status=status.HTTP_200_OK, message=constants.HEALTH_SUCCESS, payload={}
        )
