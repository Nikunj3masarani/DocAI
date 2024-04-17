import { ApiConfig } from '@docAi-app/types/Api.type';
import { apiCall, generateStream } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { parseEndpoint } from '@docAi-app/utils/helper/common.helper';
import { Method } from 'axios';

interface EditMessageTitleParams {
    chat_uuid: string;
}
interface EditMessageTitleRequestBody {
    title: string;
}

interface DeleteChatRequestBody {
    chat_uuid: string;
}

interface GetChatMessageRequestParams extends DeleteChatRequestBody {}
interface GetChatRequestBody {
    index_uuid: string;
    query: string;
    model_uuid: string;
    prompt_uuid: string;
    chat_uuid: string;
}

const getChatList = () => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.CHAT.GET_LIST.METHOD as Method,
        url: ENDPOINTS.CHAT.GET_LIST.URL,
    };

    return apiCall(data);
};

const editMessageTitle = ({ title, chat_uuid }: EditMessageTitleRequestBody & EditMessageTitleParams) => {
    const data: ApiConfig<EditMessageTitleRequestBody> = {
        method: ENDPOINTS.CHAT.UPDATE_TITLE.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.CHAT.UPDATE_TITLE.URL, { chat_uuid }),
        data: { title },
    };

    return apiCall(data);
};

const deleteChat = (requestBody: DeleteChatRequestBody) => {
    const data: ApiConfig<DeleteChatRequestBody> = {
        method: ENDPOINTS.CHAT.DELETE_CHAT.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.CHAT.DELETE_CHAT.URL , {...requestBody}),
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

    return apiCall(data);
};
const chatApi = {
    getChatList,
    editMessageTitle,
    deleteChat,
    getChat,
    getChatMessage,
};

export { chatApi };
