from app.helper.response_helper import BaseResponse


class IndexResponse(BaseResponse):
    pass


class IndexListResponse(BaseResponse):
    payload: dict = {}
