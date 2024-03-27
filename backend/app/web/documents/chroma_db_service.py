
class Documents:
    def __init__(self, chrom_db_client):
        self.chroma_db_client = chrom_db_client

    def get_index(self, index_name):
        index = self.chroma_db_client.get_collection(index_name)
        return index
