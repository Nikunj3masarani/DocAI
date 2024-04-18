interface GetAllIndexResponse {
    index_uuid: string;
    title: string;
    description: string;
    created_at: string;
}

interface CreateIndexRequestBody {
    title: string;
    description: string;
    status: string;
    tags: string[];
    prompt_uuid: string;
    model: string;
}

export type { GetAllIndexResponse, CreateIndexRequestBody };
