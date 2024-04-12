import { apiCall } from '@docAi-app/utils/api-manager';
import { ApiConfig } from '@docAi-app/types/Api.type';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { Method } from 'axios';
import { CreateIndexRequestBody, GetAllIndexResponse } from '@docAi-app/types/index.type';
import { parseEndpoint } from '@docAi-app/utils/helper/common.helper';

interface GetIndexParams {
    index_uuid: string;
}

interface DeleteIndexRequestBody extends GetIndexParams {}

type GetAllIndexRequestBody = Partial<{
    search: string;
    page_number: number;
    records_per_page: number;
    show_all: boolean;
}>;

interface GetIndexResponse {
    description: string;
    index_uuid: string;
    model_uuid: string;
    prompt_uuid: string;
    status: string;
    tags: string[];
    title: string;
}

interface GetIndexUsersRequestParams extends GetIndexParams {}

interface InviteIndexUserRequestBody {
    index_uuid: string;
    email: string;
    role: number;
}

interface RemoveIndexUserRequestBody {
    index_uuid: string;
    remove_user_uuid: string;
}

const getIndex = (requestBody: GetIndexParams) => {
    const data: ApiConfig<GetIndexParams> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.GET_INDEX.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.INDEX_MANAGEMENT.GET_INDEX.URL, { ...requestBody }),
    };
    return apiCall<GetIndexResponse, GetIndexParams>(data);
};

const getAllIndex = (requestBody: GetAllIndexRequestBody) => {
    const data: ApiConfig<GetAllIndexRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.GET_ALL_INDEX.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.GET_ALL_INDEX.URL,
        data: requestBody,
    };

    return apiCall<GetAllIndexResponse[], GetAllIndexRequestBody>(data);
};

const createIndex = (requestBody: CreateIndexRequestBody) => {
    const data: ApiConfig<CreateIndexRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.CREATE_INDEX.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.CREATE_INDEX.URL,
        data: requestBody,
    };

    return apiCall(data);
};

const deleteIndex = (requestBody: DeleteIndexRequestBody) => {
    const data: ApiConfig<DeleteIndexRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.DELETE_INDEX.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.INDEX_MANAGEMENT.DELETE_INDEX.URL, { ...requestBody }),
    };
    return apiCall(data);
};

const getIndexUsers = (requestBody: GetIndexUsersRequestParams) => {
    const data: ApiConfig<GetIndexUsersRequestParams> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.GET_USERS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.INDEX_MANAGEMENT.GET_USERS.URL, { ...requestBody }),
    };

    return apiCall(data);
};

const inviteIndexUser = (requestBody: InviteIndexUserRequestBody) => {
    const data: ApiConfig<InviteIndexUserRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.INVITE_USER.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.INVITE_USER.URL,
        data: requestBody,
    };
    return apiCall(data);
};

const removeIndexUser = (requestBody: RemoveIndexUserRequestBody) => {
    const data: ApiConfig<RemoveIndexUserRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.REMOVE_USERS.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.REMOVE_USERS.URL,
        data: requestBody,
    };

    return apiCall(data);
};

const indexApi = {
    createIndex,
    getIndex,
    getAllIndex,
    deleteIndex,
    getIndexUsers,
    inviteIndexUser,
    removeIndexUser,
};

export { indexApi };
