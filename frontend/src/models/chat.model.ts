interface EditMessageTitleParams {
    chat_uuid: string;
}

interface EditMessageTitleRequestBody {
    title: string;
}

interface EditMessageTitleProps {
    requestBody: EditMessageTitleRequestBody;
    requestParams: EditMessageTitleParams;
}

interface DeleteChatRequestParams {
    chat_uuid: string;
}

interface GetChatMessageRequestParams extends DeleteChatRequestParams {}
interface GetChatRequestBody {
    index_uuid: string;
    query: string;
    model_uuid: string;
    prompt_uuid: string;
    chat_uuid: string;
}

export type {
 
    GetChatMessageRequestParams,
    GetChatRequestBody,
    DeleteChatRequestParams,
    EditMessageTitleProps,
};
