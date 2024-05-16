import { Method } from 'axios';

import { apiCall, generateStream } from '@docAi-app/utils/api-manager';

import {
    GetChatRequestBody,
    GetChatMessageRequestParams,
    EditMessageTitleProps,
    DeleteChatRequestParams,
    GetChatListResponseBody,
} from '@docAi-app/models';

import { ApiConfig } from '@docAi-app/types';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { parseEndpoint } from '@docAi-app/utils/helper';
import { GetChatMessageResponseBody } from '@docAi-app/models';

const getChatList = () => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.CHAT.GET_LIST.METHOD as Method,
        url: ENDPOINTS.CHAT.GET_LIST.URL,
    };

    return apiCall<GetChatListResponseBody, undefined>(data);
};

const editMessageTitle = ({ requestBody, requestParams }: EditMessageTitleProps) => {
    const data: ApiConfig<EditMessageTitleProps['requestBody']> = {
        method: ENDPOINTS.CHAT.UPDATE_TITLE.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.CHAT.UPDATE_TITLE.URL, { ...requestParams }),
        data: requestBody,
    };

    return apiCall(data);
};

const deleteChat = (requestParams: DeleteChatRequestParams) => {
    const data: ApiConfig<DeleteChatRequestParams> = {
        method: ENDPOINTS.CHAT.DELETE_CHAT.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.CHAT.DELETE_CHAT.URL, { ...requestParams }),
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall(data);
};

const getChat = (requestBody: Partial<GetChatRequestBody>) => {
    const data: ApiConfig<Partial<GetChatRequestBody>> = {
        method: ENDPOINTS.CHAT.GET_CHAT.METHOD as Method,
        url: ENDPOINTS.CHAT.GET_CHAT.URL,
        data: requestBody,
    };

    return generateStream(data);
};

const getChatMessage = (requestParams: GetChatMessageRequestParams) => {
    const data: ApiConfig<GetChatMessageRequestParams> = {
        method: ENDPOINTS.CHAT.GET_CHAT_MESSAGE.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.CHAT.GET_CHAT_MESSAGE.URL, { ...requestParams }),
    };

    return apiCall<GetChatMessageResponseBody, GetChatMessageRequestParams>(data);
};

const chatApi = {
    getChatList,
    editMessageTitle,
    deleteChat,
    getChat,
    getChatMessage,
};

export { chatApi };
