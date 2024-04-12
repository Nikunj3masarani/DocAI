import { AxiosRequestConfig, AxiosHeaders, Method } from 'axios';

export type PagerType = {
    filteredRecords: number;
    pageNumber?: number;
    recordsPerPage: number;
    sortBy: string;
    sortOrder: string;
    totalRecords: number;
};

export type ApiResponse<T> = {
    message: string;
    payload: T;
    show: boolean;
    status_code: number;
    pager?: PagerType;
};

export type ApiErrorResponse = {
    payload: Record<string, string | boolean> | null;
};

export type AxiosRequest = AxiosRequestConfig & {
    headers: AxiosHeaders;
};

export type ApiConfig<D> = AxiosRequestConfig<D> & {
    method: Method;
    showLoader?: boolean;
    showSuccessToast?: boolean;
    showAlertToast?: boolean;
    scrollToTop?: boolean;
};
