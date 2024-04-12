import { ApiConfig } from '@docAi-app/types/Api.type';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { parseEndpoint } from '@docAi-app/utils/helper/common.helper';
import { Method } from 'axios';

interface PromptsListRequestBody {
    search: string;
    page_number: number;
    records_per_page: number;
    sort_order: string;
    sort_by: string;
    show_all: boolean;
}

interface CreatePromptRequestBody {
    title: string;
    description: string;
    status: string;
}

interface GetPromptRequestBody {
    prompt_uuid: string;
}

interface GetPromptResponse {
    Prompt: {
        title: string;
        content: string;
        status: string;
    };
}

interface updatePrompt {
    params: {
        prompt_uuid: string;
    };
    requestBody: {
        title: string;
        description: string;
        status: string;
    };
}

const createPrompt = async (requestBody: CreatePromptRequestBody) => {
    const data: ApiConfig<CreatePromptRequestBody> = {
        method: ENDPOINTS.PROMPT.CREATE_PROMPT.METHOD as Method,
        url: ENDPOINTS.PROMPT.CREATE_PROMPT.URL,
        data: requestBody,
    };

    return apiCall(data);
};

const getPrompt = async (requestBody: GetPromptRequestBody) => {
    const data: ApiConfig<GetPromptRequestBody> = {
        method: ENDPOINTS.PROMPT.GET_PROMPT.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.PROMPT.CREATE_PROMPT.URL, { ...requestBody }),
    };

    return apiCall<GetPromptResponse, GetPromptRequestBody>(data);
};

const getPromptsList = async (requestBody: PromptsListRequestBody) => {
    const data: ApiConfig<PromptsListRequestBody> = {
        method: ENDPOINTS.PROMPT.GET_LIST.METHOD as Method,
        url: ENDPOINTS.PROMPT.GET_LIST.URL,
        data: requestBody,
        signal: AbortSignal.timeout(500),
    };
    return apiCall(data);
};

const updatePrompt = async ({ requestBody, params }: updatePrompt) => {
    const data: ApiConfig<updatePrompt['requestBody']> = {
        method: ENDPOINTS.PROMPT.UPDATE_PROMPT.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.PROMPT.UPDATE_PROMPT.URL, params),
        data: requestBody,
    };

    return apiCall(data);
};

const PromptsApi = { getPromptsList, createPrompt, getPrompt, updatePrompt };

export { PromptsApi };
