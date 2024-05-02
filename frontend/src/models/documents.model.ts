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

interface UploadCrawlRequestParams {
    url: string;
    index_uuid: string;
}

interface UploadCrawlProps {
    requestParams: UploadCrawlRequestParams;
}

export type { GetDocumentsRequestBody, UploadDocumentsProps, DeleteDocumentRequestParams, UploadCrawlProps };
