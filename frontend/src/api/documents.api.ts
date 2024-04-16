import { ENDPOINTS } from '../utils/constants/endpoints.constant';
import { Method } from 'axios';
import { parseEndpoint } from '@docAi-app/utils/helper/common.helper';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ApiConfig } from '@docAi-app/types/Api.type';
interface GetDocumentsRequestBody {
    index_uuid: string;
}

interface UploadDocumentsProps {
    requestParams: { index_uuid: string };
    requestBody: FormData;
}

interface DeleteDocumentRequestParams {
    document_uuid: string;
}

const getDocuments = (requestBody: GetDocumentsRequestBody) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.DOCUMENTS.GET_DOCUMENTS.METHOD as Method,
      
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.GET_DOCUMENTS.URL, { ...requestBody }),
    };
    return apiCall(data);
};

const uploadDocuments = ({ requestBody, requestParams }: UploadDocumentsProps) => {
    const data: ApiConfig<UploadDocumentsProps['requestBody']> = {
        method: ENDPOINTS.DOCUMENTS.UPLOAD_DOCUMENTS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.UPLOAD_DOCUMENTS.URL, { index_uuid: requestParams.index_uuid }),
        data: requestBody,
    };

    return apiCall(data);
};

const deleteDocument = (requestBody: DeleteDocumentRequestParams) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.DOCUMENTS.GET_DOCUMENTS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.DELETE_DOCUMENTS.URL, { ...requestBody }),
    };

    return apiCall(data);
};

const documentApi = {
    getDocuments,
    deleteDocument,
    uploadDocuments,
};

export { documentApi };
