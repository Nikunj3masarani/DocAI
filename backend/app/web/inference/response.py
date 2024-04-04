from app.helper.response_helper import BaseResponse


class ChatHistoryResponse(BaseResponse):
    payload: list = []
