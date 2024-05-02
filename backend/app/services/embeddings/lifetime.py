from fastapi import FastAPI
import chromadb
from app.settings import settings
from haystack.components.embedders import SentenceTransformersDocumentEmbedder
from haystack.components.embedders import SentenceTransformersTextEmbedder
from haystack.components.rankers import TransformersSimilarityRanker


def init_embeddings(app: FastAPI) -> None:  # pragma: no cover
    document_embedding_function = SentenceTransformersDocumentEmbedder(model=settings.embedding_model_path)
    document_embedding_function.warm_up()
    query_embedding_function = SentenceTransformersTextEmbedder(model=settings.embedding_model_path)
    query_embedding_function.warm_up()
    rank_function = TransformersSimilarityRanker(model=settings.rank_model_path, top_k=3)
    rank_function.warm_up()

    app.state.document_embedding_function = document_embedding_function
    app.state.query_embedding_function = query_embedding_function
    app.state.rank_function = rank_function


def remove_embeddings(app: FastAPI) -> None:  # pragma: no cover
    app.state.document_embedding_function = None
    app.state.query_embedding_function = None
    app.state.rank_function = None

