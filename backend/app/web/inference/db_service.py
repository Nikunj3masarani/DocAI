from typing import Any, List, Dict
from sqlalchemy.future import select
from sqlalchemy import and_, delete, distinct, desc
from app import constants

from app.web.base.db_service import DBService
from app.web.common.schema import Chat as ChatTable
from app.web.common.schema import IndexUserMapping as IndexMappingTable

from app.web.common.schema import ChatHistory as ChatHistoryTable
from app.web.inference.helper import group_and_label_data
from app.exception.custom import CustomException


class Inference(DBService):
    def __init__(self, db_client):
        self.db_client = db_client

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        pass

    async def add_chat_data(self, chat_data):
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
            await self.db_client.commit()

        return chat_obj

    async def add_chat_history_data(self, chat_history_data):
        chat_history_obj = ChatHistoryTable()
        chat_history_obj.message_uuid = chat_history_data.get("message_uuid")
        chat_history_obj.user_message = chat_history_data.get("user_message")
        chat_history_obj.assistant_message = chat_history_data.get("assistant_message")
        chat_history_obj.chat_uuid = chat_history_data.get("chat_uuid")
        chat_history_obj.feedback_status = -1
        self.db_client.add(chat_history_obj)
        await self.db_client.commit()

    async def get_data_by_id(self, data: Any, *args, **kwargs) -> []:
        select_query = select(ChatTable).where(ChatTable.chat_uuid == data.get("chat_uuid"))
        chat_result = await self.db_client.execute(select_query)
        chat = chat_result.scalar_one_or_none()
        if not chat:
            raise CustomException(message=constants.CHAT_NOT_EXISTS)

        check_index_access_query = select(IndexMappingTable).where(IndexMappingTable.user_uuid == data.get("user_uuid"),
                                                                   IndexMappingTable.index_uuid == chat.index_uuid)
        check_index_access_result = await self.db_client.execute(check_index_access_query)
        check_index_access_result = check_index_access_result.scalar_one_or_none()
        if not check_index_access_result:
            raise CustomException(message=constants.INDEX_CANT_ACCESS)

        select_chat_history_query = select(ChatHistoryTable.chat_uuid,
                                           ChatHistoryTable.user_message,
                                           ChatHistoryTable.assistant_message,
                                           ChatHistoryTable.message_uuid,
                                           ChatHistoryTable.created_at,
                                           ChatHistoryTable.feedback,
                                           ChatHistoryTable.feedback_status).where(
            ChatHistoryTable.chat_uuid == data.get("chat_uuid"))
        chat_history_result = await self.db_client.execute(select_chat_history_query)
        chat_history_result = list(chat_history_result.all())
        return chat_history_result

    async def get_chat_history(self, chat_uuid):
        select_chat_history_query = select(ChatHistoryTable.chat_uuid,
                                           ChatHistoryTable.user_message,
                                           ChatHistoryTable.assistant_message,
                                           ChatHistoryTable.message_uuid,
                                           ChatHistoryTable.created_at,
                                           ChatHistoryTable.feedback,
                                           ChatHistoryTable.feedback_status).where(
            ChatHistoryTable.chat_uuid == chat_uuid).order_by(desc(ChatHistoryTable.created_at)).limit(5)
        chat_history_result = await self.db_client.execute(select_chat_history_query)
        chat_history_result = list(chat_history_result.all())
        return chat_history_result

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:

        select_query = select(ChatTable).where(ChatTable.chat_uuid == data.get("chat_uuid"))
        chat_result = await self.db_client.execute(select_query)
        chat = chat_result.scalar_one_or_none()
        if not chat:
            raise CustomException(message=constants.CHAT_NOT_EXISTS)
        check_index_access_query = select(IndexMappingTable).where(
            IndexMappingTable.user_uuid == data.get("user_uuid"),
            IndexMappingTable.index_uuid == chat.index_uuid)
        check_index_access_result = await self.db_client.execute(check_index_access_query)
        check_index_access_result = check_index_access_result.scalar_one_or_none()
        if not check_index_access_result:
            raise CustomException(message=constants.INDEX_CANT_ACCESS)

        chat.chat_title = data.get('title')
        updated_chat = chat.__dict__
        return updated_chat

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        select_chat_query = select(ChatTable).where(ChatTable.chat_uuid == data.get("chat_uuid"))
        chat_result = await self.db_client.execute(select_chat_query)
        chat_result = chat_result.first()
        if not chat_result:
            raise CustomException(constants.CHAT_NOT_EXISTS)
        check_index_access_query = select(IndexMappingTable).where(
            IndexMappingTable.index_uuid == chat_result[0].index_uuid,
            IndexMappingTable.user_uuid == data.get('user_uuid'))

        check_index_access_result = await self.db_client.execute(check_index_access_query)
        check_index_access_result = check_index_access_result.first()
        if not check_index_access_result:
            raise CustomException(constants.INDEX_CANT_ACCESS)

        delete_chat_history_query = delete(ChatHistoryTable).where(ChatHistoryTable.chat_uuid == data.get("chat_uuid"))
        delete_prompt_query = delete(ChatTable).where(ChatTable.chat_uuid == data.get("chat_uuid"))
        _ = await self.db_client.execute(delete_chat_history_query)
        _ = await self.db_client.execute(delete_prompt_query)

        await self.db_client.commit()

    async def get_all_data(self, data: Any, *args, **kwargs) -> List[Dict]:
        select_user_indexes_query = select(IndexMappingTable.index_uuid).where(
            IndexMappingTable.user_uuid == data.get('user_uuid'))
        user_index_list = await self.db_client.execute(select_user_indexes_query)
        user_index_list = list(user_index_list.all())
        user_index_list = [str(index[0]) for index in user_index_list]

        select_chat_history_query = select(distinct(ChatTable.chat_uuid).label('chat_uuid'),
                                           ChatTable.chat_title,
                                           ChatTable.prompt_uuid,
                                           ChatTable.created_at,
                                           ChatTable.model_uuid,
                                           ChatTable.created_by,
                                           ChatTable.index_uuid).join(ChatHistoryTable).where(
            ChatTable.index_uuid.in_(user_index_list)).order_by(desc(ChatTable.created_at))
        chat_history_response = await self.db_client.execute(select_chat_history_query)
        result = group_and_label_data(list(chat_history_response.all()))
        return result
