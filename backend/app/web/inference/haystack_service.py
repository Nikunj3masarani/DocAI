
from haystack.components.builders.prompt_builder import PromptBuilder
from haystack_integrations.document_stores.elasticsearch import ElasticsearchDocumentStore
from haystack_integrations.components.retrievers.elasticsearch import ElasticsearchEmbeddingRetriever
from haystack_integrations.components.retrievers.elasticsearch import ElasticsearchBM25Retriever
from haystack.components.joiners import DocumentJoiner
from openai import AsyncAzureOpenAI
from app import constants
from app.settings import settings


class Inference:
    def __init__(self, index_name, query_embeddings_function, model_details, rank_function, callback_function=None):
        self.prompt_builder = PromptBuilder(template=constants.RAG_PROMPT)
        self.query_embeddings_function = query_embeddings_function
        self.model_details = model_details
        document_store = ElasticsearchDocumentStore(hosts=settings.es_host_url, index=index_name.lower())
        self.document_query_retriever = ElasticsearchBM25Retriever(document_store=document_store)
        self.document_embeddings_retriever = ElasticsearchEmbeddingRetriever(document_store=document_store)
        self.document_joiner = DocumentJoiner()
        self.rank_function = rank_function
        self.callback_function = callback_function

    def get_answer(self, query):
        llm = AsyncAzureOpenAI(
            api_key=self.model_details.get('api_key'),
            api_version=self.model_details.get('api_version'),
            azure_endpoint=self.model_details.get('deployment_url'),
            azure_deployment=self.model_details.get('target_name'),
        )

        query_embeddings = self.query_embeddings_function.run(text=query)

        relevant_embeddings_documents = self.document_embeddings_retriever.run(query_embedding=query_embeddings.get("embedding"),
                                                                               top_k=10)
        relevant_query_documents = self.document_query_retriever.run(query=query,
                                                                     top_k=10)

        relevant_documents = self.document_joiner.run(
            documents=[relevant_embeddings_documents.get('documents'), relevant_query_documents.get('documents')])

        ranked_documents = self.rank_function.run(query=query, documents=relevant_documents.get('documents'))

        prompt = self.prompt_builder.run(
            documents=ranked_documents.get("documents"),
            question=query
        )
        messages = [{"role": "user", "content": prompt.get("prompt")}]

        async def response_generator():
            completion_result = await llm.chat.completions.create(
                messages=messages,
                model=self.model_details.get('target_name'),
                max_tokens=512,
                stream=True)

            async for token in completion_result:
                token_string = ' '.join([choice.delta.content or "" for choice in token.choices])

                if self.callback_function:
                    await self.callback_function(token)

                yield token_string
        return response_generator
