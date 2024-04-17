from app.helper.response_helper import BaseResponse


class PromptResponse(BaseResponse):
    pass


class PromptListResponse(BaseResponse):
    payload: list = []
    pager: dict = {}
