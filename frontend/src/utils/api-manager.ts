import axios, { AxiosError } from 'axios';
import { ApiConfig, ApiErrorResponse, ApiResponse, AxiosRequest } from '@docAi-app/types/Api.type';
import { getFromLocalStorage, removeFromLocalStorage } from '@docAi-app/utils/helper/storage.helper';
import { ACCESS_TOKEN_KEY } from '@docAi-app/utils/constants/storage.constant';
import { ERROR_STATUS_CODE } from '@docAi-app/utils/constants/common.constant';

let loaderCount = 0;

const defaultHeaders = {
    'Content-Type': 'application/json; charset=UTF-8',
};

const defaultApiConfig = {
    showLoader: true,
    showSuccessToast: true,
    showAlertToast: true,
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
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data) return response.data;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        const { status } = error?.response || {};

        if (status === ERROR_STATUS_CODE[401]) {
            removeFromLocalStorage(ACCESS_TOKEN_KEY);
            return Promise.reject({ show: false });
        }

        const parsedJson = JSON.parse(error?.request?.response || false);

        if (!parsedJson) {
            if (error?.message === 'Network Error') {
                return Promise.reject({ show: false });
            }
            return Promise.reject(error);
        }

        return Promise.reject(parsedJson);
    },
);

export async function* getIterableStream(body: ReadableStream<Uint8Array>): AsyncIterable<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    while (true) {
        const chunk = await reader.read();
        const { value, done } = chunk;
        if (done) {
            break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
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
    if (response.status !== 200) throw new Error(response.status.toString());
    if (!response.body) throw new Error('Response body does not exist');


    return getIterableStream(response.body);
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
            const { show, message } = response;
            if (show && showSuccessToast && message) {
                //success toast
            }
            if (scrollToTop) {
                //scroll to top
            }
            return response;
        })
        .catch((error) => {
            // if (error && showAlertToast && error.message) {
            //     console.log({ error });
            // }
            // throw error;
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
