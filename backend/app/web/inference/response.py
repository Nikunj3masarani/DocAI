from app.helper.response_helper import BaseResponse


class ChatHistoryResponse(BaseResponse):
    payload: dict = {}


class ChatMessageResponse(BaseResponse):
    payload: list = []
