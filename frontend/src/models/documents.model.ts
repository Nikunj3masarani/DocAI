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

export type { GetDocumentsRequestBody, UploadDocumentsProps, DeleteDocumentRequestParams };
