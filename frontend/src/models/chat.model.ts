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

interface GetChatListResponseBody
    extends Record<
        string,
        {
            chat_uuid: string;
            chat_title: string;
            prompt_uuid: string;
            created_at: string;
            model_uuid: string;
            created_by: string;
            index_uuid: string;
        }[]
    > {}

type GetChatMessageResponseBody = {
    chat_uuid: string;
    user_message: string;
    assistant_message: string;
    message_uuid: string;
    created_at: string;
    feedback: number;
    feedback_status: number;
}[];

export type {
    GetChatMessageRequestParams,
    GetChatRequestBody,
    DeleteChatRequestParams,
    EditMessageTitleProps,
    GetChatListResponseBody,
    GetChatMessageResponseBody,
};
