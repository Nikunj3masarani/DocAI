import { Method } from 'axios';
import { apiCall } from '@docAi-app/utils/api-manager';
import { ENDPOINTS } from '@docAi-app/utils/constants/endpoints.constant';
import { parseEndpoint } from '@docAi-app/utils/helper';
import { ApiConfig } from '@docAi-app/types';
import {
    GetDocumentsRequestBody,
    UploadDocumentsProps,
    DeleteDocumentRequestParams,
    UploadCrawlProps,
} from '@docAi-app/models';

const getDocuments = (requestParams: GetDocumentsRequestBody) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.DOCUMENTS.GET_DOCUMENTS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.GET_DOCUMENTS.URL, { ...requestParams }),
    };
    return apiCall(data);
};

const uploadDocuments = ({ requestBody, requestParams }: UploadDocumentsProps) => {
    const data: ApiConfig<UploadDocumentsProps['requestBody']> = {
        method: ENDPOINTS.DOCUMENTS.UPLOAD_DOCUMENTS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.UPLOAD_DOCUMENTS.URL, { index_uuid: requestParams.index_uuid }),
        data: requestBody,
        showSuccessToast: true,
        showLoader: true,
    };

    return apiCall(data);
};

const deleteDocument = (requestParams: DeleteDocumentRequestParams) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.DOCUMENTS.DELETE_DOCUMENTS.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.DELETE_DOCUMENTS.URL, { ...requestParams }),
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall(data);
};

const uploadCrawl = ({ requestParams }: UploadCrawlProps) => {
    const data: ApiConfig<undefined> = {
        method: ENDPOINTS.DOCUMENTS.UPLOAD_CRAWL.METHOD as Method,
        url: parseEndpoint(ENDPOINTS.DOCUMENTS.UPLOAD_CRAWL.URL, { ...requestParams }),
        showSuccessToast: true,
        showAlertToast: true,
    };

    return apiCall(data);
};

const documentApi = {
    getDocuments,
    deleteDocument,
    uploadDocuments,
    uploadCrawl,
};

export { documentApi };
