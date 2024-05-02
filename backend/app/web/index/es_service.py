
class Index:
    def __init__(self, es_client):
        self.es_client = es_client

    async def create_index(self, index_name):
        if not await self.es_client.indices.exists(index=index_name):
            es_mapping = {
                "properties": {
                    "embedding": {"type": "dense_vector", "index": True, "similarity": "cosine", 'dims': 384}
                }
            }
            await self.es_client.indices.create(index=index_name.lower(), mappings=es_mapping)
        return index_name

    async def delete_index(self, index_name):
        is_exists = await self.es_client.indices.exists(index=index_name.lower())
        if is_exists:
            await self.es_client.indices.delete(index=index_name.lower())

    async def get_index_list(self):
        response = await self.es_client.cat.indices(format="json")
        indexes = [index['index'] for index in response]
        return indexes
