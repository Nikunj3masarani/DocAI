interface PromptsListRequestBody {
    search: string;
    page_number: number;
    records_per_page: number;
    sort_order: string;
    sort_by: string;
    show_all: boolean;
}

interface Prompt {
    title: string;
    description: string;
    status: string;
}

interface CreatePromptRequestBody extends Prompt {}

interface GetPromptRequestParams {
    prompt_uuid: string;
}

interface GetPromptResponseBody {
    Prompt: { title: string; content: string; status: string; prompt_uuid: string; created_at: string };
}

interface UpdatePromptProps {
    requestParams: {
        prompt_uuid: string;
    };
    requestBody: Prompt;
}

type CreatePromptResponseBody = GetPromptResponseBody['Prompt'];
type GetPromptListResponseBody = GetPromptResponseBody['Prompt'][];
type UpdatePromptResponseBody = GetPromptResponseBody['Prompt'];

export type {
    PromptsListRequestBody,
    GetPromptListResponseBody,
    CreatePromptRequestBody,
    GetPromptRequestParams,
    GetPromptResponseBody,
    UpdatePromptProps,
    CreatePromptResponseBody,
    UpdatePromptResponseBody,
};
