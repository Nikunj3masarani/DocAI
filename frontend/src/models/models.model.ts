interface Model {
    target_name: string;
    model_uuid: string;
    display_name: string;
}

interface ModelListResponse {
    models: Model[];
}

export type { ModelListResponse };
