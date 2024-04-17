interface Model {
    target_name: string;
    model_uuid: string;
    display_name: string;
}

export interface ModelListResponse {
    models: Model[];
}
