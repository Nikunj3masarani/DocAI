from typing import AsyncGenerator
from starlette.requests import Request


async def get_chroma_client(request: Request):  # pragma: no cover
    """
    Returns elasticsearch client.
    """
    return request.app.state.chroma_client
