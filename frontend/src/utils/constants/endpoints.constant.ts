import { ROUTE } from './Route.constant';

export const INDEX = 'index';
export const MODELS = 'models';
export const PROMPTS = 'prompts';
export const DOCUMENTS = 'documents';
export const INDEX_UUID = 'index_uuid';
export const PROMPT_UUID = 'prompt_uuid';
export const CHAT = 'chat';
export const USERS = 'users';

export const METHOD = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PUT: 'put',
};

export const ENDPOINTS = {
    AUTH: {
        LOGIN: {
            METHOD: METHOD.POST,
            URL: `${USERS}/login`,
        },
        OAUTH_LOGIN: {
            METHOD: METHOD.POST,
            URL: `${USERS}/auth2login`,
        },
        FORGOT_PASSWORD: {
            METHOD: METHOD.POST,
            URL: `${USERS}/forget-password`,
        },
        INVITE_USER: {
            METHOD: METHOD.POST,
            URL: `${USERS}/invite`,
        },
        SET_PASSWORDS: {
            METHOD: METHOD.POST,
            URL: `${USERS}/set-password`,
        },
    },
    INDEX_MANAGEMENT: {
        GET_INDEX: {
            URL: `${INDEX}/?${INDEX_UUID}`,
            METHOD: `${METHOD.GET}`,
        },
        CREATE_INDEX: {
            URL: `${INDEX}/`,
            METHOD: `${METHOD.POST}`,
        },

        DELETE_INDEX: {
            URL: `${INDEX}/?${INDEX_UUID}`,
            METHOD: `${METHOD.DELETE}`,
        },
        GET_ALL_INDEX: {
            URL: `${INDEX}/list`,
            METHOD: `${METHOD.POST}`,
        },
        UPDATE_INDEX: {
            URL: `${INDEX}/?${INDEX_UUID}`,
            METHOD: `${METHOD.PUT}`,
        },
        GET_USERS: {
            URL: `${INDEX}/${USERS}/?${INDEX_UUID}`,
            METHOD: METHOD.GET,
        },
        INVITE_USER: {
            URL: `${INDEX}/${USERS}/invite`,
            METHOD: METHOD.POST,
        },
        INVITE_USER_V1: {
            URL: `${INDEX}/${USERS}/invite/v1`,
            METHOD: METHOD.POST,
        },
        SEARCH_USER: {
            URL: `${USERS}/list`,
            METHOD: METHOD.POST,
        },
        REMOVE_USERS: {
            URL: `${INDEX}/${USERS}/remove`,
            METHOD: METHOD.POST,
        },
        ADD_USERS: {
            URL: `${INDEX}/${USERS}/invite/update`,
            METHOD: METHOD.POST,
        },
    },
    MODELS: {
        GET_LIST: {
            METHOD: METHOD.GET,
            URL: `${MODELS}/list`,
        },
    },
    PROMPT: {
        GET_LIST: {
            METHOD: METHOD.POST,
            URL: `${PROMPTS}/list`,
        },
        GET_PROMPT: {
            METHOD: METHOD.GET,
            URL: `${PROMPTS}/?${PROMPT_UUID}`,
        },
        CREATE_PROMPT: {
            METHOD: METHOD.POST,
            URL: `${PROMPTS}`,
        },
        UPDATE_PROMPT: {
            METHOD: METHOD.PUT,
            URL: `${PROMPTS}/?${PROMPT_UUID}`,
        },
    },
    DOCUMENTS: {
        GET_DOCUMENTS: {
            METHOD: `${METHOD.POST}`,
            URL: `${DOCUMENTS}/list?index_uuid`,
        },
        UPLOAD_DOCUMENTS: {
            METHOD: METHOD.POST,
            URL: `${DOCUMENTS}/upload/?${INDEX_UUID}`,
        },
        DELETE_DOCUMENTS: {
            METHOD: METHOD.DELETE,
            URL: `${DOCUMENTS}/?document_uuid`,
        },
        UPLOAD_CRAWL: {
            METHOD: METHOD.POST,
            URL: `${DOCUMENTS}/crawl/?url&${INDEX_UUID}`,
        },
    },
    CHAT: {
        GET_LIST: {
            METHOD: METHOD.GET,
            URL: `${CHAT}/list`,
        },
        UPDATE_TITLE: {
            METHOD: METHOD.PUT,
            URL: `${CHAT}/?${ROUTE.CHAT_ID}`,
        },
        DELETE_CHAT: {
            METHOD: METHOD.DELETE,
            URL: `${CHAT}?${ROUTE.CHAT_ID}`,
        },
        GET_CHAT: {
            METHOD: METHOD.POST,
            URL: `${CHAT}`,
        },
        GET_CHAT_MESSAGE: {
            METHOD: METHOD.GET,
            URL: `${CHAT}/?${ROUTE.CHAT_ID}`,
        },
    },
};
