import { apiCall } from '@docAi-app/utils/api-manager';
import { ApiConfig } from '@docAi-app/types';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { Method } from 'axios';
import { CreateIndexRequestBody, GetAllIndexResponse } from '@docAi-app/types';
import { parseEndpoint } from '@docAi-app/utils/helper';
import {
    DeleteIndexParams,
    GetAllIndexRequestBody,
    GetIndexRequestParams,
    GetIndexResponse,
    GetIndexUsersRequestParams,
    InviteIndexUserRequestBody,
    RemoveIndexUserRequestBody,
    UpdateIndexProps,
} from '@docAi-app/models';

const getIndex = (requestParams: GetIndexRequestParams) => {
    const data: ApiConfig<GetIndexRequestParams> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.GET_INDEX.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.INDEX_MANAGEMENT.GET_INDEX.URL, { ...requestParams }),
    };
    return apiCall<GetIndexResponse, GetIndexRequestParams>(data);
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
        showAlertToast: true,
        showSuccessToast: true,
    };

    return apiCall(data);
};

const deleteIndex = (requestParams: DeleteIndexParams) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.DELETE_INDEX.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.INDEX_MANAGEMENT.DELETE_INDEX.URL, { ...requestParams }),
        showSuccessToast: true,
        showAlertToast: true,
    };
    return apiCall(data);
};

const updateIndex = ({ requestBody, requestParams }: UpdateIndexProps) => {
    const data: ApiConfig<UpdateIndexProps['requestBody']> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.UPDATE_INDEX.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.INDEX_MANAGEMENT.UPDATE_INDEX.URL, { ...requestParams }),
        data: requestBody,
        showAlertToast: true,
        showSuccessToast: true,
    };

    return apiCall(data);
};

const getIndexUsers = (requestParams: GetIndexUsersRequestParams) => {
    const data: ApiConfig<GetIndexUsersRequestParams> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.GET_USERS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.INDEX_MANAGEMENT.GET_USERS.URL, { ...requestParams }),
    };

    return apiCall(data);
};

const inviteIndexUser = (requestBody: InviteIndexUserRequestBody) => {
    const data: ApiConfig<InviteIndexUserRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.INVITE_USER.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.INVITE_USER.URL,
        data: requestBody,
        showSuccessToast: true,
        showAlertToast: true,
    };
    return apiCall(data);
};

const removeIndexUser = (requestBody: RemoveIndexUserRequestBody) => {
    const data: ApiConfig<RemoveIndexUserRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.REMOVE_USERS.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.REMOVE_USERS.URL,
        data: requestBody,
        showSuccessToast: true,
        showAlertToast: true,
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
    updateIndex,
};

export { indexApi };
