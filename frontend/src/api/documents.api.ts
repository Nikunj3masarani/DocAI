import { ENDPOINTS } from '../utils/constants/endpoints.constant';
import { Method } from 'axios';
import { parseEndpoint } from '@docAi-app/utils/helper/common.helper';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ApiConfig } from '@docAi-app/types/Api.type';
interface GetDocumentsRequestBody {
    index_uuid: string;
}

const getDocuments = (requestBody: GetDocumentsRequestBody) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.DOCUMENTS.GET_DOCUMENTS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.GET_DOCUMENTS.URL, { ...requestBody }),
    };

    return apiCall(data);
};



const DocumentAPi = {
    getDocuments,
};

export { DocumentAPi };
