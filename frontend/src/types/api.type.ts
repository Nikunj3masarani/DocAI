import { AxiosRequestConfig, AxiosHeaders, Method } from 'axios';

type PagerType = {
    pageNumber?: number;
    per_page: number;
    sortBy: string;
    sortOrder: string;
    total_records: number;
};

type ApiResponse<T> = {
    message: string;
    payload: T;
    show: boolean;
    status_code: number;
    pager?: PagerType;
};

type ApiErrorResponse = {
    payload: Record<string, string | boolean> | null;
};

type AxiosRequest = AxiosRequestConfig & {
    headers: AxiosHeaders;
};

type ApiConfig<D> = AxiosRequestConfig<D> & {
    method: Method;
    showLoader?: boolean;
    showSuccessToast?: boolean;
    showAlertToast?: boolean;
    scrollToTop?: boolean;
};

export type { ApiResponse, ApiErrorResponse, AxiosRequest, ApiConfig };
