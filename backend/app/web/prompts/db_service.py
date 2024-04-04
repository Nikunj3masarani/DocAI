import uuid
from typing import Any, List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.web.base.db_service import DBService
from app.web.common.schema import Prompt as PromptTable
from app.exception import CustomException
from app.web.index.constants import IndexType
from app import constants
from sqlalchemy.future import select
from sqlalchemy import delete, subquery, func, or_, String, desc, outerjoin

from datetime import datetime


class Prompts(DBService):
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        select_prompt_query = select(PromptTable).where(PromptTable.title == data.get("title"))
        prompt_result = await self.db_session.execute(select_prompt_query)
        prompt_result = prompt_result.first()
        if prompt_result:
            raise CustomException(constants.PROMPT_ALREADY_EXISTS)
        prompt = PromptTable()
        prompt.title = data.get('title')
        prompt.content = data.get('description')
        prompt.prompt_uuid = uuid.uuid4()
        prompt.created_at = datetime.utcnow()
        prompt.status = 'Active'
        self.db_session.add(prompt)
        await self.db_session.commit()
        return prompt.__dict__

    async def get_data_by_id(self, _id: Any, *args, **kwargs) -> Dict:
        select_prompt_query = select(PromptTable).where(PromptTable.prompt_uuid == _id)
        prompt_result = await self.db_session.execute(select_prompt_query)
        prompt_result = prompt_result.first()
        if not prompt_result:
            raise CustomException(constants.PROMPT_DOES_NOT_EXISTS)
        return dict(prompt_result)

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:
        select_query = select(PromptTable).where(PromptTable.prompt_uuid == data.get("prompt_uuid"))
        prompt_result = await self.db_session.execute(select_query)
        prompt = prompt_result.scalar_one_or_none()
        if not prompt:
            raise CustomException(message=constants.PROMPT_DOES_NOT_EXISTS)

        select_query = select(PromptTable).where(PromptTable.title == data.get("title"))
        existing_prompt_result = await self.db_session.execute(select_query)
        existing_prompt = existing_prompt_result.scalar_one_or_none()
        if existing_prompt and existing_prompt.prompt_uuid != prompt.prompt_uuid:
            raise CustomException(message=constants.PROMPT_ALREADY_EXISTS)

        for key, value in data.items():
            if value:
                setattr(prompt, key, value)

        updated_prompt = prompt.__dict__
        return updated_prompt

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        select_prompt_query = select(PromptTable).where(PromptTable.prompt_uuid == data)
        prompt_result = await self.db_session.execute(select_prompt_query)
        prompt_result = prompt_result.first()
        if not prompt_result:
            raise CustomException(constants.PROMPT_DOES_NOT_EXISTS)
        delete_prompt_query = delete(PromptTable).where(PromptTable.prompt_uuid == data)
        prompt_result = await self.db_session.execute(delete_prompt_query)
        await self.db_session.commit()
        return {}

    async def get_all_data(self, data: Any, *args, **kwargs) -> Dict:
        query = select(
            PromptTable.prompt_uuid,
            PromptTable.title,
            PromptTable.status,
            PromptTable.content,
            PromptTable.created_at)

        if data.search:
            search = f"%{data.search.lower()}%"
            query = query.filter(or_(
                func.cast(PromptTable.title, String).ilike(search),
                PromptTable.content.ilike(search),
            ))
        if data.sort_by and data.sort_order:
            if data.sort_order.lower() == 'asc':
                query = query.order_by(data.sort_by)
            elif data.sort_order.lower() == 'desc':
                query = query.order_by(desc(data.sort_by))

        offset = (data.page_number - 1) * data.records_per_page
        paginated_query = query.offset(offset).limit(data.records_per_page)

        prompt_list_result = await self.db_session.execute(paginated_query)
        prompt_list_result = list(prompt_list_result.all())

        total_records_result = await self.db_session.execute(select(func.count()).select_from(query))
        total_records = total_records_result.scalar_one_or_none()

        return {
            'data': prompt_list_result,
            "pager": {
                'page': data.page_number,
                'per_page': data.records_per_page,
                'total_records': total_records
            }
        }

