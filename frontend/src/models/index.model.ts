interface GetIndexRequestParams {
    index_uuid: string;
}

interface DeleteIndexParams extends GetIndexRequestParams {}

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

interface GetIndexUsersRequestParams extends GetIndexRequestParams {}

interface InviteIndexUserRequestBody {
    index_uuid: string;
    email: string;
    role: number;
}

interface InviteIndexUserV1RequestBody {
    index_uuid: string;
    user_uuid: string;
    role: number;
}

interface SearchUserRequestBody {
    search: string;
}

interface RemoveIndexUserRequestBody {
    index_uuid: string;
    remove_user_uuid: string;
}

interface UpdateIndexRequestBody {
    description: string;
    status: string;
    tags: string[];
    prompt_uuid: string;
    model: string;
}

interface UpdateIndexProps {
    requestBody: UpdateIndexRequestBody;
    requestParams: {
        index_uuid: string;
    };
}

interface AddIndexUserRequestBody {
    token: string;
    user_uuid: string;
    status: 1 | 2;
    index_uuid: string;
}

interface UserListResponseBody {
    email: string;
    user_uuid: string;
    full_name: string;
}

interface UserListSelectType {
    value: string;
    label: string;
}

export type {
    GetIndexRequestParams,
    DeleteIndexParams,
    GetAllIndexRequestBody,
    GetIndexResponse,
    GetIndexUsersRequestParams,
    InviteIndexUserRequestBody,
    RemoveIndexUserRequestBody,
    UpdateIndexProps,
    AddIndexUserRequestBody,
    SearchUserRequestBody,
    UserListResponseBody,
    UserListSelectType,
    InviteIndexUserV1RequestBody,
};
