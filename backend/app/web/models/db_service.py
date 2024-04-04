from typing import Any, List, Dict
from sqlalchemy.future import select
from sqlalchemy import and_
from app import constants
from app.web.base.db_service import DBService
from app.web.common.schema import Model as ModelTable
from app.web.common.schema import Index as IndexTable
from app.exception.custom import CustomException


class Model(DBService):
    def __init__(self, db_client):
        self.db_client = db_client

    async def insert_data(self, data: Any, *args, **kwargs) -> Dict:
        pass

    async def get_data_by_id(self, _id: Any, *args, **kwargs) -> Dict:
        select_model_query = select(ModelTable.model_uuid, ModelTable.target_name,
                                    ModelTable.deployment_url,
                                    ModelTable.deployment, ModelTable.api_version,
                                    ModelTable.api_key).where(ModelTable.model_uuid == _id)
        model_result = await self.db_client.execute(select_model_query)
        model_result = model_result.one()
        return dict(model_result)

    async def update_data(self, data: Any, *args, **kwargs) -> Dict:
        pass

    async def delete_data(self, data: Any, *args, **kwargs) -> None:
        pass

    async def get_all_data(self, data: Any, *args, **kwargs) -> List[Dict]:
        select_model_list_query = select(ModelTable.target_name, ModelTable.model_uuid, ModelTable.display_name)
        model_list_result = await self.db_client.execute(select_model_list_query)
        model_list_result = list(model_list_result.all())
        return model_list_result
