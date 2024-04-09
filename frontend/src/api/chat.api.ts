import { ApiConfig } from '@docAi-app/types/Api.type';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { Method } from 'axios';

interface EditMessageTitleRequestBody {
    chat_uuid: string;
    title: string;
}

interface DeleteChatRequestBody {
    chat_uuid: string;
}

const getChatList = () => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.CHAT.GET_LIST.METHOD as Method,
        url: ENDPOINTS.CHAT.GET_LIST.URL,
    };

    return apiCall(data);
};

const editMessageTitle = (requestBody: EditMessageTitleRequestBody) => {
    const data: ApiConfig<EditMessageTitleRequestBody> = {
        method: ENDPOINTS.CHAT.UPDATE_TITLE.METHOD as Method,
        url: ENDPOINTS.CHAT.UPDATE_TITLE.URL,
        data: requestBody,
    };

    return apiCall(data);
};

const deleteChat = (requestBody: DeleteChatRequestBody) => {
    const data: ApiConfig<DeleteChatRequestBody> = {
        method: ENDPOINTS.CHAT.DELETE_CHAT.METHOD as Method,
        url: ENDPOINTS.CHAT.DELETE_CHAT.URL,
        data: requestBody,
    };

    return apiCall(data);
};
const chatApi = {
    getChatList,
    editMessageTitle,
    deleteChat,
};

export { chatApi };
