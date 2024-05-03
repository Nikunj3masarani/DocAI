import uuid
from typing import Any, List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.web.base.db_service import DBService
from app.web.common.schema import Index as IndexTable
from app.web.common.schema import Documents as DocumentTable
from app.web.common.schema import IndexUserMapping as IndexUserMappingTable
from app.web.common.schema import Chat as ChatTable
from app.web.common.schema import ChatHistory as ChatHistoryTable
from app.web.common.schema import User as UserTable
from app.web.common.schema import Invitation as InvitationTable
from app.exception import CustomException
from app.web.index.constants import IndexType
from app import constants
from sqlalchemy.future import select
from datetime import datetime
from sqlalchemy import delete, subquery, func, or_, String, desc, outerjoin


class Index(DBService):
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        existing_index_query = select(IndexTable).where(IndexTable.title == data.get('title'))
        existing_index_result = await self.db_session.execute(existing_index_query)
        existing_index_result = existing_index_result.first()
        if existing_index_result:
            raise CustomException(constants.INDEX_EXISTS)
        index_obj = IndexTable()
        index_obj.index_uuid = uuid.uuid4()
        index_obj.title = data.get("title")
        index_obj.description = data.get("description")
        index_obj.status = "Private"
        index_obj.created_by = data.get('user_uuid')
        index_obj.index_type = IndexType.DOCUMENT.value
        index_obj.tags = data.get('tags')
        prompt_uuid = data.get('prompt_uuid')
        if prompt_uuid:
            index_obj.prompt_uuid = prompt_uuid
        index_obj.model = data.get("model")
        index_obj.created_at = datetime.now()
        index_user_mapping = IndexUserMappingTable()
        self.db_session.add(index_obj)
        await self.db_session.commit()

        index_user_mapping.index_uuid = index_obj.index_uuid
        index_user_mapping.user_uuid = data.get('user_uuid')
        index_user_mapping.uuid = uuid.uuid4()
        index_user_mapping.role = constants.IndexRole.OWNER
        index_user_mapping.created_at = datetime.utcnow()
        self.db_session.add(index_user_mapping)
        await self.db_session.commit()
        return index_obj.__dict__

    async def get_data_by_id(self, data: Any, *args, **kwargs) -> Dict:
        select_index_query = select(IndexTable).outerjoin(IndexUserMappingTable, IndexTable.index_uuid
                                                          == IndexUserMappingTable.index_uuid).where(
            IndexTable.index_uuid == data.get('index_uuid'), IndexUserMappingTable.user_uuid == data.get('user_uuid'))
        index_result = await self.db_session.execute(select_index_query)
        index_result = index_result.scalar_one_or_none()
        if not index_result:
            raise CustomException(constants.INDEX_NOT_FOUND)
        return index_result.__dict__

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:
        update_index_query = select(IndexTable, IndexUserMappingTable.role).join(
            IndexUserMappingTable, IndexUserMappingTable.index_uuid == IndexTable.index_uuid).where(
            IndexTable.index_uuid == data.get("index_uuid"), IndexUserMappingTable.user_uuid == data.get("user_uuid"))
        update_index_result = await self.db_session.execute(update_index_query)
        update_index_result = update_index_result.first()
        if not update_index_result:
            raise CustomException(constants.INDEX_NOT_FOUND)
        if update_index_result.role != constants.IndexRole.OWNER:
            raise CustomException(constants.INDEX_CAN_NOT_UPDATED)

        index_query = select(IndexTable).where(IndexTable.index_uuid == data.get('index_uuid'))
        index_result = await self.db_session.execute(index_query)
        index_result = index_result.first()

        index_result = index_result[0]
        # Update index attributes
        index_result.title = data.get("title", index_result.title)
        index_result.description = data.get("description", index_result.description)
        index_result.tags = data.get("tags", index_result.tags)
        index_result.status = data.get("status", index_result.status)
        index_result.prompt_uuid = data.get("prompt_uuid", index_result.prompt_uuid)
        # index_result.model = data.get("model", index_result.model)
        await self.db_session.commit()

        return index_result.__dict__

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        select_index_query = select(IndexTable, IndexUserMappingTable.role).join(
            IndexUserMappingTable, IndexUserMappingTable.index_uuid == IndexTable.index_uuid).where(
            IndexTable.index_uuid == data.get("index_uuid"), IndexUserMappingTable.user_uuid == data.get("user_uuid"))
        index_result = await self.db_session.execute(select_index_query)
        index_result = index_result.first()
        if not index_result:
            raise CustomException(constants.INDEX_NOT_FOUND)
        if index_result.role != constants.IndexRole.OWNER:
            raise CustomException(constants.INDEX_CAN_NOT_DELETED)

        delete_index_query = delete(IndexTable).where(IndexTable.index_uuid == data.get("index_uuid"))
        delete_index_user_mapping = delete(IndexUserMappingTable).where(
            IndexUserMappingTable.index_uuid == data.get("index_uuid"))
        delete_documents_query = delete(DocumentTable).where(DocumentTable.index_uuid == data.get("index_uuid"))
        select_chat_query = select(ChatTable.chat_uuid).where(ChatTable.index_uuid == data.get("index_uuid"))

        chat_id_result = await self.db_session.execute(select_chat_query)
        chat_ids = list(chat_id_result.scalars())

        delete_chat_history_query = delete(ChatHistoryTable).where(ChatHistoryTable.chat_uuid.in_(chat_ids))
        delete_chat_query = delete(ChatTable).where(ChatTable.chat_uuid.in_(chat_ids))

        _ = await self.db_session.execute(delete_documents_query)
        _ = await self.db_session.execute(delete_chat_history_query)
        _ = await self.db_session.execute(delete_chat_query)
        _ = await self.db_session.execute(delete_index_user_mapping)
        _ = await self.db_session.execute(delete_index_query)

        return index_result

    async def get_all_data(self, data: Any, *args, **kwargs) -> Dict:

        select_index_list_query = select(IndexTable.index_uuid,
                                         IndexTable.title,
                                         IndexTable.description,
                                         IndexTable.created_at
                                         ).join(IndexUserMappingTable,
                                                IndexUserMappingTable.index_uuid == IndexTable.index_uuid).where(
            IndexUserMappingTable.user_uuid == data.get('user_uuid'))
        if data.get("search"):
            search = f"%{data.get('search').lower()}%"
            select_index_list_query = select_index_list_query.filter(or_(
                IndexTable.title.ilike(search),
                IndexTable.description.ilike(search),
            ))

        if data.get("sort_by") and data.get("sort_order"):
            if data.get("sort_order").lower() == 'asc':
                select_index_list_query = select_index_list_query.order_by(data.get("sort_by"))
            elif data.get("sort_order").lower() == 'desc':
                select_index_list_query = select_index_list_query.order_by(desc(data.get("sort_by")))

        offset = (data.get("page_number") - 1) * data.get("records_per_page")
        paginated_query = select_index_list_query.offset(offset).limit(data.get("records_per_page"))

        index_list_result = await self.db_session.execute(paginated_query)
        index_list_result = list(index_list_result.all())

        total_records_result = await self.db_session.execute(select(func.count()).select_from(select_index_list_query))
        total_records = total_records_result.scalar_one_or_none()

        return {
            'data': index_list_result,
            "pager": {
                'page': data.get("page_number"),
                'per_page': data.get("records_per_page"),
                'total_records': total_records
            }
        }

    async def get_index_name(self, data):
        select_index_name_query = select(IndexTable.title).join(IndexUserMappingTable,
                                                                IndexTable.index_uuid == IndexUserMappingTable.index_uuid
                                                                ).where(IndexTable.index_uuid == data.get('index_uuid'),
                                                                        IndexUserMappingTable.user_uuid == data.get(
                                                                            'user_uuid'))

        select_index_name_result = await self.db_session.execute(select_index_name_query)
        select_index_name_result = select_index_name_result.scalar_one_or_none()
        if not select_index_name_result:
            raise CustomException(message=constants.INDEX_NOT_FOUND)
        return select_index_name_result

    async def get_index_users_list(self, data):
        select_index_users_query = select(IndexUserMappingTable.role, UserTable.email, UserTable.full_name,
                                          UserTable.user_uuid).join(
            UserTable, IndexUserMappingTable.user_uuid == UserTable.user_uuid).where(
            IndexUserMappingTable.index_uuid == data.get("index_uuid"))
        index_user_list = await self.db_session.execute(select_index_users_query)
        index_user_list = list(index_user_list.all())
        return index_user_list

    async def remove_user_from_index(self, data):

        select_index_query = select(IndexTable.index_uuid, IndexUserMappingTable.role).join(
            IndexUserMappingTable, IndexUserMappingTable.index_uuid == IndexTable.index_uuid).where(
            IndexTable.index_uuid == data.get('index_uuid'),
            IndexUserMappingTable.user_uuid == data.get('user_uuid')
        )
        index_result = await self.db_session.execute(select_index_query)
        index_result = index_result.first()
        if not index_result:
            raise CustomException(message=constants.INDEX_NOT_FOUND)
        elif index_result.role != constants.IndexRole.OWNER:
            raise CustomException(message=constants.INDEX_USER_CAN_NOT_REMOVED)
        remove_index_user_query = delete(IndexUserMappingTable).where(
            IndexUserMappingTable.user_uuid == data.get('remove_user_uuid'),
            IndexUserMappingTable.index_uuid == data.get('index_uuid'))
        _ = await self.db_session.execute(remove_index_user_query)

    async def invite_user_for_index(self, data):
        select_index_query = select(UserTable).where(UserTable.email == data.get('email'))
        select_user_result = await self.db_session.execute(select_index_query)
        select_user_result = select_user_result.first()
        if not select_user_result:
            raise CustomException(constants.USER_NOT_EXISTS)

        invitation_obj = InvitationTable()
        invitation_obj.invited_by = data.get('user_uuid')
        invitation_obj.token = str(uuid.uuid4())
        invitation_obj.invite_uuid = uuid.uuid4()
        invitation_obj.role_id = data.get('role').value
        invitation_obj.created_at = datetime.utcnow()
        invitation_obj.status = constants.InvitationStatus.SENT
        invitation_obj.invite_action = constants.UserInviteAction.INDEX
        invitation_obj.user_uuid = select_user_result[0].user_uuid
        self.db_session.add(invitation_obj)
        await self.db_session.commit()
        return invitation_obj.__dict__

    async def index_user_invite_status_update(self, data):

        select_index_exists_query = select(IndexTable).where(IndexTable.index_uuid == data.get('index_uuid'))
        select_index_exists = await self.db_session.execute(select_index_exists_query)
        index_exists_result = select_index_exists.first()
        if not index_exists_result:
            raise CustomException(constants.INDEX_NOT_FOUND)

        select_invitation_query = select(InvitationTable).where(InvitationTable.token == data.get('token'),
                                                                InvitationTable.user_uuid == data.get('user_uuid'),
                                                                InvitationTable.status == constants.InvitationStatus.SENT)

        select_invitation = await self.db_session.execute(select_invitation_query)
        invitation_result = select_invitation.first()
        if not invitation_result:
            raise CustomException(constants.USER_INVALID_INVITATION)

        user_invite_status = data.get('status')
        if user_invite_status == 1:
            index_user_mapping = IndexUserMappingTable()
            index_user_mapping.uuid = uuid.uuid4()
            index_user_mapping.index_uuid = data.get('index_uuid')
            index_user_mapping.user_uuid = data.get('user_uuid')
            index_user_mapping.role = invitation_result[0].role_id
            index_user_mapping.created_at = datetime.now()
            self.db_session.add(index_user_mapping)

        invitation_result[0].token = None
        invitation_result[
            0].status = constants.InvitationStatus.ACCEPTED.value if user_invite_status == 1 else constants.InvitationStatus.REJECTED.value
        await self.db_session.commit()
