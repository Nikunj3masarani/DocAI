import axios, { AxiosError } from 'axios';
import { ApiConfig, ApiErrorResponse, ApiResponse, AxiosRequest } from '@docAi-app/types';
import { getFromLocalStorage } from '@docAi-app/utils/helper';
import { ACCESS_TOKEN_KEY } from '@docAi-app/utils/constants/storage.constant';
import { ERROR_STATUS_CODE } from '@docAi-app/utils/constants/common.constant';
import { getAlert } from '@docAi-app/hooks';

let loaderCount = 0;

const defaultHeaders = {
    'Content-Type': 'application/json; charset=UTF-8',
};

const defaultApiConfig = {
    showLoader: true,
    showSuccessToast: false,
    showAlertToast: false,
    scrollToTop: false,
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: {
        ...defaultHeaders,
    },
});

axiosInstance.interceptors.request.use((config: AxiosRequest) => {
    const token = getFromLocalStorage(ACCESS_TOKEN_KEY);
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    if (config.url?.includes('upload')) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data) return response.data;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        const errorResponse = error?.response ?? { data: '' };
        return Promise.reject(errorResponse.data);
    },
);

export async function* getIterableStream<ResponsePayload>(
    body: ReadableStream<Uint8Array>,
): AsyncIterable<ResponsePayload> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    while (true) {
        const chunk = await reader.read();
        const { value, done } = chunk;
        if (done) {
            break;
        }
        const decodedChunk = decoder.decode(value, { stream: true }) as ResponsePayload;
        yield decodedChunk;
    }
}

export const generateStream = async <ResponsePayload, RequestBody = undefined>(
    apiConfig: ApiConfig<RequestBody>,
): Promise<AsyncIterable<string>> => {
    const { method, url, data } = apiConfig;
    const token = getFromLocalStorage(ACCESS_TOKEN_KEY);
    const baseUrl = import.meta.env.VITE_BASE_API;
    const response = await fetch(`${baseUrl}${url}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, stream: true }),
    });

    if (response.status === ERROR_STATUS_CODE['422']) {
        getAlert('error', 'Something went wrong');
        throw new Error(response.status.toString());
    }
    if (!response.body) throw new Error('Response body does not exist');

    return getIterableStream<ResponsePayload>(response.body);
};

export const apiCall = async <ResponsePayload, RequestBody = undefined>(
    apiConfig: ApiConfig<RequestBody>,
): Promise<ApiResponse<ResponsePayload>> => {
    const { showLoader, showSuccessToast, showAlertToast, scrollToTop, ...apiReqConfig } = {
        ...defaultApiConfig,
        ...apiConfig,
    };
    if (showLoader) {
        showLoading();
    }

    return axiosInstance
        .request<ResponsePayload, ApiResponse<ResponsePayload>, RequestBody>(apiReqConfig)
        .then((response) => {
            const { message } = response;
            if (showSuccessToast && message) {
                getAlert('success', message);
            }
            if (scrollToTop) {
                //scroll to top
            }
            return response;
        })
        .catch((error) => {
            const { status_code, status, message }: { status: number; status_code: number; message: string } = error;
            if (showAlertToast && message) {
                getAlert('error', message);
            } else if (status_code === ERROR_STATUS_CODE['422'] || status === ERROR_STATUS_CODE['422']) {
                getAlert('error', message);
            }
            throw error;
        })
        .finally(() => {
            if (showLoader) {
                hideLoading();
            }
        });
};

//helper function to show/hide the loader
const showLoading = () => {
    const linearLoader = document.getElementsByClassName('apiLoader');
    if (linearLoader && linearLoader.length > 0) {
        loaderCount += 1;
        linearLoader[0].classList.remove('hidden');
    }
};

const hideLoading = () => {
    const linearLoader = document.getElementsByClassName('apiLoader');
    loaderCount -= 1;
    if (linearLoader && linearLoader.length > 0 && loaderCount <= 0) {
        linearLoader[0].classList.add('hidden');
    }
};
