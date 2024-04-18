from haystack.components.converters import PyPDFToDocument, TextFileToDocument, HTMLToDocument
from haystack.components.preprocessors import DocumentCleaner, DocumentSplitter
from haystack_integrations.document_stores.elasticsearch import ElasticsearchDocumentStore
from haystack.components.writers.document_writer import DuplicatePolicy
import tempfile
from app.settings import settings


class Documents:
    def __init__(self, index_name, embeddings_function):

        self.document_cleaner = DocumentCleaner()
        self.document_spliter = DocumentSplitter(split_by="word", split_length=200, split_overlap=0)
        self.document_embeddings = embeddings_function
        self.document_store = ElasticsearchDocumentStore(hosts=settings.es_host_url, index=index_name.lower(), timeout=300)

    async def index_document(self, doc):
        with tempfile.NamedTemporaryFile() as temp_file:
            temp_file.write(await doc.read())
            temp_file_name = temp_file.name
            doc_ext = doc.filename.split(".")[-1]
            if doc_ext == 'pdf':
                document_converter = PyPDFToDocument()
            elif doc_ext == 'txt':
                document_converter = TextFileToDocument()
            elif doc_ext == 'html':
                document_converter = HTMLToDocument()

            converted_documents = document_converter.run(sources=[temp_file_name])
            cleaned_documents = self.document_cleaner.run(documents=converted_documents.get('documents'))
            split_documents = self.document_spliter.run(documents=cleaned_documents.get('documents'))
            embedded_documents = self.document_embeddings.run(documents=split_documents.get('documents'))

            self.document_store.write_documents(embedded_documents.get("documents"))
            
        return embedded_documents["documents"][0].meta["source_id"]
    
    async def delete_document(self, source_id):
        docs = self.document_store.filter_documents({
                    "source_id": source_id
                })
        
        docs_ids = list()
        for doc in docs:
            docs_ids.append(doc.id)
            
        self.document_store.delete_documents(docs_ids)    
            
        
        


