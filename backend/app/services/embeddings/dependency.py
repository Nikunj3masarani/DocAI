from starlette.requests import Request


async def get_documents_embedding_function(request: Request):
    return request.app.state.document_embedding_function


async def get_query_embedding_function(request: Request):
    return request.app.state.query_embedding_function
