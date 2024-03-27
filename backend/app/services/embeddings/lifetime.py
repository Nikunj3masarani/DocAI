from fastapi import FastAPI
import chromadb
from app.settings import settings
from haystack.components.embedders import SentenceTransformersDocumentEmbedder
from haystack.components.embedders import SentenceTransformersTextEmbedder


def init_embeddings(app: FastAPI) -> None:  # pragma: no cover
    """
    Creates connection pool for redis.

    :param app: current fastapi application.
    """

    document_embedding_function = SentenceTransformersDocumentEmbedder(model=settings.embedding_model_path)
    document_embedding_function.warm_up()
    query_embedding_function = SentenceTransformersTextEmbedder(model=settings.embedding_model_path)
    query_embedding_function.warm_up()
    app.state.document_embedding_function = document_embedding_function
    app.state.query_embedding_function = query_embedding_function


def remove_embeddings(app: FastAPI) -> None:  # pragma: no cover
    """
    Closes redis connection pool.

    :param app: current FastAPI app.
    """
    app.state.document_embedding_function = None
    app.state.query_embedding_function = None

