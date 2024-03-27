

from fastapi import FastAPI
import chromadb
from app.settings import settings


def init_chroma(app: FastAPI) -> None:  # pragma: no cover
    """
    Creates connection pool for redis.

    :param app: current fastapi application.
    """

    app.state.chroma_client = chromadb.HttpClient(host=settings.chroma_db_host, port=settings.chroma_db_port)


async def shutdown_chroma(app: FastAPI) -> None:  # pragma: no cover
    """
    Closes redis connection pool.

    :param app: current FastAPI app.
    """
