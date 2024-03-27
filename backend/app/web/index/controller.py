from fastapi import Depends, status
from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from app.web.index.service import Index as IndexService
from app.web.index.validator import CreateIndex
from app.web.index.response import IndexResponse, IndexListResponse
from app.services.db.dependency import get_db_session
from app.services.chroma.dependency import get_chroma_client

router = InferringRouter()


@cbv(router)
class Index:
    @router.post("/")
    async def create_index(
        self,
        index_data: CreateIndex,
        db=Depends(get_db_session),
        chroma_client=Depends(get_chroma_client)
    ) -> IndexResponse:
        index_service = IndexService(db, chroma_client)
        index_data_dict = index_data.__dict__
        response = await index_service.create(index_data_dict)
        return IndexResponse(
            payload=response,
            message=constants.INDEX_CREATED,
            status=status.HTTP_200_OK,
        )

    @router.get("/")
    async def get_index(
        self,
        index_uuid: str,
        db=Depends(get_db_session),
    ):
        index_service = IndexService(db)
        index_data = await index_service.get(index_uuid)
        return IndexResponse(
            payload=index_data,
            message=constants.INDEX_FOUND,
            status=status.HTTP_200_OK,
        )

    @router.delete("/")
    async def delete_index(
            self,
            index_uuid: str,
            db=Depends(get_db_session),
            chroma_client=Depends(get_chroma_client)
    ):
        index_service = IndexService(db, chroma_client)
        _ = await index_service.delete(index_uuid)
        return IndexResponse(
            payload={},
            message=constants.INDEX_DELETED,
            status=status.HTTP_200_OK,
        )

    @router.post("/list")
    async def get_all_index(
            self,
            db=Depends(get_db_session),
    ):
        index_service = IndexService(db)
        index_list = await index_service.get_list({})
        return IndexListResponse(
            payload=index_list,
            message=constants.INDEX_LIST_FETCHED,
            status=status.HTTP_200_OK,
        )
