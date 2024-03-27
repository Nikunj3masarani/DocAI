from app import logger
from app.settings import settings
from fastapi import Request
from app.exception import CustomException
from app.helper.response_helper import BaseResponse
from starlette.middleware.base import BaseHTTPMiddleware
import time
import uuid


class ProfilerMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):

        """
        Middleware class performs
         1. add request_id to track execution
         2. logs processing time
         3. handle server side exception globally.
        """
        request_id = str(uuid.uuid4())
        start_time = time.time()
        try:
            request.state.request_id = request_id
            response = await call_next(request)
            process_time = time.time() - start_time
            response.headers["X-Process-Time"] = str(process_time)
            response.headers["Request-ID"] = request_id
            # logger.debug(
            #     f"RequestID: {request_id} -> Path {request.url.path} ->"
            #     f" Status {response.status_code} "
            #     f"-> Time Taken: {process_time}"
            # )
            if process_time >= 2:
                logger.warn(
                    f"RequestID: {request_id} Taking more than 2 seconds."
                    f" please review the code."
                )
            return response

        except CustomException as ce:
            resp = await BaseResponse.custom_exception_response(ce.name)
            return resp
        except Exception as e:
            if settings.environment == "dev":
                import traceback

                print(traceback.format_exc())
            logger.error(
                f"RequestID: {request_id} -> Path {request.url.path}"
                f" Error: {str(e)}"
            )
            return await BaseResponse.server_error_response()
