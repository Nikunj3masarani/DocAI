import { Method } from 'axios';

import {
    CreatePromptRequestBody,
    CreatePromptResponseBody,
    GetPromptListResponseBody,
    GetPromptRequestParams,
    GetPromptResponseBody,
    PromptsListRequestBody,
    UpdatePromptProps,
    UpdatePromptResponseBody,
} from '@docAi-app/models';

import { apiCall } from '@docAi-app/utils/api-manager';

import { ApiConfig } from '@docAi-app/types';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { parseEndpoint } from '@docAi-app/utils/helper';

const createPrompt = async (requestBody: CreatePromptRequestBody) => {
    const data: ApiConfig<CreatePromptRequestBody> = {
        method: ENDPOINTS.PROMPT.CREATE_PROMPT.METHOD as Method,
        url: ENDPOINTS.PROMPT.CREATE_PROMPT.URL,
        data: requestBody,
    };

    return apiCall<CreatePromptResponseBody, CreatePromptRequestBody>(data);
};

const getPrompt = async (requestParams: GetPromptRequestParams) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.PROMPT.GET_PROMPT.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.PROMPT.GET_PROMPT.URL, { ...requestParams }),
    };

    return apiCall<GetPromptResponseBody, undefined>(data);
};

const getPromptsList = async (requestBody: PromptsListRequestBody) => {
    const data: ApiConfig<PromptsListRequestBody> = {
        method: ENDPOINTS.PROMPT.GET_LIST.METHOD as Method,
        url: ENDPOINTS.PROMPT.GET_LIST.URL,
        data: requestBody,
    };
    return apiCall<GetPromptListResponseBody, PromptsListRequestBody>(data);
};

const updatePrompt = async ({ requestBody, requestParams }: UpdatePromptProps) => {
    const data: ApiConfig<UpdatePromptProps['requestBody']> = {
        method: ENDPOINTS.PROMPT.UPDATE_PROMPT.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.PROMPT.UPDATE_PROMPT.URL, requestParams),
        data: requestBody,
        showSuccessToast: true,
    };

    return apiCall<UpdatePromptResponseBody, UpdatePromptProps['requestBody']>(data);
};

const promptApi = { getPromptsList, createPrompt, getPrompt, updatePrompt };

export { promptApi };
