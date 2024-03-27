class Inference:
    def __init__(self, chroma_db_client):
        self.chroma_db_client = chroma_db_client

    def get_index(self, index_name):
        return self.chroma_db_client.get_collection(index_name)
