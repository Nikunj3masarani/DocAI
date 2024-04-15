import { ApiConfig } from '@docAi-app/types/Api.type';
import { ModelListResponse } from '@docAi-app/types/models.type';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { Method } from 'axios';

const getModelsList = () => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.MODELS.GET_LIST.METHOD as Method,
        url: ENDPOINTS.MODELS.GET_LIST.URL,
    };

    return apiCall<ModelListResponse>(data);
};

const modelApi = {
    getModelsList,
};
export { modelApi };
