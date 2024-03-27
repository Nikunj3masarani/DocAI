from haystack.components.converters import PyPDFToDocument
from haystack.components.preprocessors import DocumentCleaner, DocumentSplitter
import tempfile


class Documents:
    def __init__(self, chroma_document_store, embeddings_function):
        self.document_converter = PyPDFToDocument()
        self.document_cleaner = DocumentCleaner()
        self.document_spliter = DocumentSplitter(split_by="word", split_length=200, split_overlap=0)
        self.chroma_document_store = chroma_document_store
        self.document_embeddings = embeddings_function

    async def index_document(self, doc):
        with tempfile.NamedTemporaryFile() as temp_file:
            temp_file.write(await doc.read())
            temp_file_name = temp_file.name

            converted_documents = self.document_converter.run(sources=[temp_file_name])
            cleaned_documents = self.document_cleaner.run(documents=converted_documents.get('documents'))
            split_documents = self.document_spliter.run(documents=cleaned_documents.get('documents'))
            embedded_documents = self.document_embeddings.run(documents=split_documents.get('documents'))

            self.chroma_document_store.write_documents(embedded_documents.get("documents"))


