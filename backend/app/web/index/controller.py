from fastapi import Depends, status
from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from app.web.index.service import Index as IndexService
from app.web.index.validator import CreateIndex, IndexList, IndexRemoveUser, IndexInviteUser, IndexUserUpdate, UpdateIndex
from app.web.index.response import IndexResponse, IndexListResponse, IndexUserResponse
from app.services.db.dependency import get_db_session
from app.services.es.dependency import get_es_client
from app.middleware.auth import AuthBearer
router = InferringRouter()


@cbv(router)
class Index:
    @router.post("/")
    async def create_index(
        self,
        index_data: CreateIndex,
        db=Depends(get_db_session),
        es_client=Depends(get_es_client),
        user=Depends(AuthBearer())

    ) -> IndexResponse:
        index_service = IndexService(db, es_client)
        index_data_dict = index_data.__dict__
        index_data_dict['user_uuid'] = user.get('user_uuid')
        response = await index_service.create(index_data_dict)
        return IndexResponse(
            payload=response,
            message=constants.INDEX_CREATED,
            status=status.HTTP_200_OK,
        )

    @router.put("/")
    async def update_index(
        self,
        index_data: UpdateIndex,
        db=Depends(get_db_session),
        es_client=Depends(get_es_client),
        user=Depends(AuthBearer())

    ) -> IndexResponse:
        index_service = IndexService(db, es_client)
        index_data_dict = index_data.__dict__
        index_data_dict['user_uuid'] = user.get('user_uuid')
        response = await index_service.update(index_data_dict)
        return IndexResponse(
            payload=response,
            message=constants.INDEX_UPDATED,
            status=status.HTTP_200_OK,
        )
        
    @router.get("/")
    async def get_index(
        self,
        index_uuid: str,
        db=Depends(get_db_session),
        user=Depends(AuthBearer())

    ):
        index_service = IndexService(db)
        index_data = {
            "index_uuid": index_uuid,
            "user_uuid": user.get("user_uuid")
        }
        index_data = await index_service.get(index_data)
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
            es_client=Depends(get_es_client),
            user=Depends(AuthBearer())

    ):
        index_service = IndexService(db, es_client)
        delete_index_data = {
            "index_uuid": index_uuid,
            "user_uuid": user.get("user_uuid")
        }
        _ = await index_service.delete(delete_index_data)
        return IndexResponse(
            payload={},
            message=constants.INDEX_DELETED,
            status=status.HTTP_200_OK,
        )

    @router.post("/list")
    async def get_all_index(
            self,
            index_list: IndexList,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        index_service = IndexService(db)
        index_list_data = index_list.__dict__
        index_list_data['user_uuid'] = user.get('user_uuid')
        index_list = await index_service.get_list(index_list_data)
        return IndexListResponse(
            payload=index_list.get('data'),
            pager=index_list.get('pager'),
            message=constants.INDEX_LIST_FETCHED,
            status=status.HTTP_200_OK,
        )

    @router.get('/users')
    async def get_index_users(
        self,
        index_uuid: str,
        db=Depends(get_db_session),
        user=Depends(AuthBearer())
    ):
        index_data = {
            "user_uuid": user.get('user_uuid'),
            "index_uuid": index_uuid
        }
        index_service = IndexService(db)
        index_user_list = await index_service.get_index_users(index_data)
        return IndexUserResponse(
            payload=index_user_list,
            message=constants.INDEX_USERS_FETCHED,
            status=status.HTTP_200_OK,
        )

    @router.post('/users/remove')
    async def remove_index_user(
            self,
            index_remove_data: IndexRemoveUser,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        index_data = index_remove_data.__dict__
        index_data['user_uuid'] = user.get('user_uuid')
        index_service = IndexService(db)

        _ = await index_service.index_remove_user(index_data)
        return IndexResponse(
            payload={},
            message=constants.INDEX_USER_REMOVED,
            status=status.HTTP_200_OK,
        )

    @router.post('/users/invite')
    async def invite_index_user(
            self,
            invite_user_data: IndexInviteUser,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        index_data = invite_user_data.__dict__
        index_data['user_uuid'] = user.get('user_uuid')
        index_service = IndexService(db)

        _ = await index_service.index_invite_user(index_data)
        return IndexResponse(
            payload={},
            message=constants.INDEX_USER_INVITED,
            status=status.HTTP_200_OK,
        )

    @router.post('/users/invite/update')
    async def add_index_user(
            self,
            invite_update_data: IndexUserUpdate,
            db=Depends(get_db_session)
    ):
        invite_update_data = invite_update_data.__dict__
        index_service = IndexService(db)

        _ = await index_service.index_invite_user_update(invite_update_data)
        return IndexResponse(
            payload={},
            message=constants.INDEX_USER_UPDATE,
            status=status.HTTP_200_OK,
        )
