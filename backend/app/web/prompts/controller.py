from fastapi import Depends, status
from app import constants
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from app.services.db.dependency import get_db_session
from app.web.prompts.service import Prompt as PromptService
from app.web.prompts.response import PromptResponse, PromptListResponse
from app.web.prompts.validator import CreatePrompt, PromptList, UpdatePrompt
from app.middleware.auth import AuthBearer
router = InferringRouter()


@cbv(router)
class Prompts:
    @router.post("/")
    async def create_prompt(
            self,
            prompt: CreatePrompt,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        prompt_service = PromptService(db)
        prompt_data = prompt.__dict__
        prompt_response = await prompt_service.create(prompt_data)
        return PromptResponse(
            payload=prompt_response,
            message=constants.PROMPT_CREATED,
            status=status.HTTP_200_OK,
        )

    @router.get("/")
    async def get_prompt(
            self,
            prompt_uuid: str,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        prompt_service = PromptService(db)
        prompt_response = await prompt_service.get(prompt_uuid)
        return PromptResponse(
            payload=prompt_response,
            message=constants.PROMPT_FOUND,
            status=status.HTTP_200_OK,
        )

    @router.delete("/")
    async def delete_prompt(
            self,
            prompt_uuid: str,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        prompt_service = PromptService(db)
        prompt_response = await prompt_service.delete(prompt_uuid)
        return PromptResponse(
            payload=prompt_response,
            message=constants.PROMPT_DELETED,
            status=status.HTTP_200_OK,
        )

    @router.put("/")
    async def update_prompt(
            self,
            prompt_uuid: str,
            prompt_data: UpdatePrompt,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        prompt_service = PromptService(db)
        update_prompt_data = prompt_data.__dict__
        update_prompt_data['prompt_uuid'] = prompt_uuid

        prompt_response = await prompt_service.update(update_prompt_data)
        return PromptResponse(
            payload=prompt_response,
            message=constants.PROMPT_UPDATED,
            status=status.HTTP_200_OK,
        )

    @router.post("/list")
    async def get_all_prompts(
            self,
            data: PromptList,
            db=Depends(get_db_session),
            user=Depends(AuthBearer())
    ):
        prompt_service = PromptService(db)
        prompt_response = await prompt_service.get_list(data)
        return PromptListResponse(
            payload=prompt_response.get("data"),
            pager=prompt_response.get("pager"),
            message=constants.PROMPT_LIST_FETCHED,
            status=status.HTTP_200_OK,
        )
