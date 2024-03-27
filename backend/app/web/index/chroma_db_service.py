
class Index:
    def __init__(self, chroma_client):
        self.chroma_client = chroma_client

    def create_index(self, index_name):
        return self.chroma_client.get_or_create_collection(index_name)

    def delete_index(self, index_name):
        self.chroma_client.delete_collection(index_name)

    def get_index_list(self):
        index_list = self.chroma_client.list_collections()
        index_list = [index.name for index in index_list]
        return index_list