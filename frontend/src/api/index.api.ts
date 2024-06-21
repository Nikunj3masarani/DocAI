import {
    AddIndexUserRequestBody,
    DeleteIndexParams,
    GetAllIndexRequestBody,
    GetIndexRequestParams,
    GetIndexResponse,
    GetIndexUsersRequestParams,
    RemoveIndexUserRequestBody,
    UpdateIndexProps,
} from '@docAi-app/models';
import { InviteIndexUserV1RequestBody, SearchUserRequestBody } from '@docAi-app/models/index.model';
import { ApiConfig, CreateIndexRequestBody, GetAllIndexResponse } from '@docAi-app/types';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { parseEndpoint } from '@docAi-app/utils/helper';
import { Method } from 'axios';

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

const inviteIndexUser = (requestBody: InviteIndexUserV1RequestBody) => {
    const data: ApiConfig<InviteIndexUserV1RequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.INVITE_USER_V1.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.INVITE_USER_V1.URL,
        data: requestBody,
        showSuccessToast: true,
        showAlertToast: true,
    };
    return apiCall(data);
};

const searchUser = (requestBody: SearchUserRequestBody) => {
    const data: ApiConfig<SearchUserRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.SEARCH_USER.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.SEARCH_USER.URL,
        data: requestBody,
        showSuccessToast: false,
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

const addIndexUser = (requestBody: AddIndexUserRequestBody) => {
    const data: ApiConfig<AddIndexUserRequestBody> = {
        method: ENDPOINTS.INDEX_MANAGEMENT.ADD_USERS.METHOD as Method,
        url: ENDPOINTS.INDEX_MANAGEMENT.ADD_USERS.URL,
        data: requestBody,
        showAlertToast: true,
        showSuccessToast: true,
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
    addIndexUser,
    searchUser,
};

export { indexApi };
