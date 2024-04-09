export const INDEX = 'index';
export const MODELS = 'models';
export const PROMPTS = 'prompts';
export const DOCUMENTS = 'documents';
export const INDEX_UUID = 'index_uuid';
export const PROMPT_UUID = 'prompt_uuid';
export const CHAT = 'chat';

export const METHOD = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PUT: 'put',
};

export const ENDPOINTS = {
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
            URL: `${PROMPTS}`,
        },
        CREATE_PROMPT: {
            METHOD: METHOD.POST,
            URL: `${PROMPTS}/?${PROMPT_UUID}`,
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
    },
    CHAT: {
        GET_LIST: {
            METHOD: METHOD.GET,
            URL: `${CHAT}/list`,
        },
        UPDATE_TITLE: {
            METHOD: METHOD.PUT,
            URL: `${CHAT}`,
        },
        DELETE_CHAT: {
            METHOD: METHOD.DELETE,
            URL: `${CHAT}`,
        },
    },
};
