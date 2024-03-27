from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import status
from app import constants
from pydantic import BaseModel


class BaseResponse(BaseModel):
    message: str
    status: int
    payload: dict = {}

    @classmethod
    async def request_exception_response(cls, exc):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=jsonable_encoder(
                {
                    "message": constants.VALIDATION_ERROR,
                    "payload": str(exc),
                    "status_code": status.HTTP_422_UNPROCESSABLE_ENTITY,
                }
            ),
        )

    @classmethod
    async def custom_exception_response(cls, message):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "message": message,
                "status": status.HTTP_422_UNPROCESSABLE_ENTITY,
                "payload": {},
            },
        )

    @classmethod
    async def server_error_response(cls):
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": constants.SOMETHING_WENT_WRONG,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "payload": {},
            },
        )
