from app.web.models.db_service import Model as ModelDBService
class Model:
    def __init__(self, db_client):
        self.db_client = db_client

    async def get_model_list(self):
        model_db_service = ModelDBService(self.db_client)
        model_list = await model_db_service.get_all_data({})
        return {

            "models": model_list
        }
