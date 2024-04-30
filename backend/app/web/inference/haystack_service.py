from haystack.components.builders.prompt_builder import PromptBuilder
from haystack_integrations.document_stores.elasticsearch import ElasticsearchDocumentStore
from haystack_integrations.components.retrievers.elasticsearch import ElasticsearchEmbeddingRetriever
from haystack_integrations.components.retrievers.elasticsearch import ElasticsearchBM25Retriever
from haystack.components.joiners import DocumentJoiner
from openai import AsyncAzureOpenAI, AsyncOpenAI
from app import constants
from app.settings import settings
from cryptography.fernet import Fernet


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

    def decrypt_data(self, key, encrypted_data):
        fernet = Fernet(key)
        decrypted_data = fernet.decrypt(encrypted_data).decode()
        return decrypted_data

    async def get_condense_question(self, chat_history, query):
        sorted_chat_history = sorted(chat_history, key=lambda x: x['created_at'], reverse=True)[:5]
        conversation = '\n'.join([
            f"User: {chat.user_message} \n  Assistant: {chat.assistant_message} \n Time: {chat.created_at}"
            for chat in sorted_chat_history
        ])
        condense_prompt = f'''
                    Instructions: 
                        
                        1. Review the conversations between User and Assistant provided below.
                        2. Given the following conversation and a follow up question, rephrase the follow up query 
                            to be a standalone question,
                        3. Condense the question by extracting the most relevant keywords or summarizing the intent.
                        4. Prioritize recent questions.

                    Conversation History:
                            {conversation}
                            
                    Query: {query}

                    Output: 
                        The standalone version of the user's most recent question, without any additional explanation.
                    '''
        llm = AsyncOpenAI(
            api_key=self.decrypt_data(settings.secret_key, self.model_details.get('api_key')),
        )
        messages = [{"role": "user", "content": condense_prompt}]
        completion_result = await llm.chat.completions.create(messages=messages, model=self.model_details.get('target_name'))
        condense_query = []
        for token in completion_result.choices:
            condense_query.append(token.message.content or "")
        return ''.join(condense_query)

    def get_answer(self, query):
        llm = AsyncOpenAI(
            api_key=self.decrypt_data(settings.secret_key, self.model_details.get('api_key')),
        )

        query_embeddings = self.query_embeddings_function.run(text=query)

        relevant_embeddings_documents = self.document_embeddings_retriever.run(
            query_embedding=query_embeddings.get("embedding"),
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
