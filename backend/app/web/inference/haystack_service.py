from haystack_integrations.components.retrievers.chroma import ChromaEmbeddingRetriever
from haystack.components.builders.prompt_builder import PromptBuilder
from openai import AzureOpenAI

from app.settings import settings
from app import constants


class Inference:
    def __init__(self, chroma_db_store, query_embeddings_function):
        self.document_retriever = ChromaEmbeddingRetriever(chroma_db_store, top_k=10)
        self.prompt_builder = PromptBuilder(template=constants.RAG_PROMPT)
        self.query_embeddings_function = query_embeddings_function

    def get_answer(self, query):
        llm = AzureOpenAI(
            api_key=settings.azure_api_key,
            api_version=settings.azure_api_version,
            azure_endpoint=settings.azure_endpoint,
            azure_deployment=settings.azure_deployment,
        )

        query_embeddings = self.query_embeddings_function.run(text=query)
        match_documents = self.document_retriever.run(query_embedding=query_embeddings.get("embedding"))
        prompt = self.prompt_builder.run(
            documents=match_documents.get("documents"),
            question=query
        )
        messages = [{"role": "user", "content": prompt.get("prompt")}]

        def response_generator():
            completion_result = llm.chat.completions.create(
                messages=messages,
                model=settings.azure_deployment,
                max_tokens=512,
                stream=True)

            for token in completion_result:
                yield ' '.join([choice.delta.content or "" for choice in token.choices])

        return response_generator
