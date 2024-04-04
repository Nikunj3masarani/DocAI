from typing import Any, List, Dict
from sqlalchemy.future import select
from sqlalchemy import and_
from app import constants

from app.web.base.db_service import DBService
from app.web.common.schema import Chat as ChatTable
from app.web.common.schema import ChatHistory as ChatHistoryTable
from app.web.inference.helper import group_and_label_data
from app.exception.custom import CustomException


class Inference(DBService):
    def __init__(self, db_client):
        self.db_client = db_client

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        pass

    async def add_data(self, chat_data):
        select_chat_query = select(ChatTable).where(ChatTable.chat_uuid == chat_data.get("chat_uuid"))
        chat_result = await self.db_client.execute(select_chat_query)
        chat_obj = chat_result.first()
        if not chat_obj:
            chat_obj = ChatTable()
            chat_obj.chat_uuid = chat_data.get("chat_uuid")
            chat_obj.index_uuid = chat_data.get("index_uuid")
            chat_obj.chat_title = chat_data.get("user_message")
            chat_obj.created_by = chat_data.get("user_uuid")
            chat_obj.model_uuid = chat_data.get("model_uuid")
            self.db_client.add(chat_obj)

        chat_history_obj = ChatHistoryTable()
        chat_history_obj.message_uuid = chat_data.get("message_uuid")
        chat_history_obj.user_message = chat_data.get("user_message")
        chat_history_obj.assistant_message = chat_data.get("assistant_message")
        chat_history_obj.chat_uuid = chat_data.get("chat_uuid")
        chat_history_obj.feedback_status = -1
        self.db_client.add(chat_history_obj)
        await self.db_client.commit()

    async def get_data_by_id(self, _id: Any, *args, **kwargs) -> Dict:
        pass

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:
        pass

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        pass

    async def get_all_data(self, data: Any, *args, **kwargs) -> List[Dict]:
        select_chat_history_query = select(ChatTable.chat_uuid,
                                           ChatTable.chat_title,
                                           ChatTable.prompt_uuid,
                                           ChatTable.created_at,
                                           ChatTable.model_uuid,
                                           ChatTable.created_by,
                                           ChatTable.index_uuid).join(ChatHistoryTable)
        chat_history_response = await self.db_client.execute(select_chat_history_query)
        response = group_and_label_data([dict(d)for d in list(chat_history_response.all())])
        return response

