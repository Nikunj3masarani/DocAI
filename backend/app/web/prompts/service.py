from typing import Any
from app.web.prompts.db_service import Prompts as PromptDBService
from app.web.base.service import BaseService


class Prompt(BaseService):
    def __init__(self, db_client):
        self.db_client = db_client

    async def create(self, data: Any, *args, **kwargs):
        prompt_db_service = PromptDBService(self.db_client)
        return await prompt_db_service.insert_data(data)

    async def get(self, data: Any, *args, **kwargs):
        prompt_db_service = PromptDBService(self.db_client)
        return await prompt_db_service.get_data_by_id(data)

    async def delete(self, data: Any, *args, **kwargs):
        prompt_db_service = PromptDBService(self.db_client)
        return await prompt_db_service.delete_data(data)

    async def get_list(self, data: Any, *args, **kwargs):
        prompt_db_service = PromptDBService(self.db_client)
        return await prompt_db_service.get_all_data(data)

    async def update(self, data: Any, *args, **kwargs):
        prompt_db_service = PromptDBService(self.db_client)
        return await prompt_db_service.update_data(data)


