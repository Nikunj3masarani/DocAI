import { v4 as uuidv4 } from 'uuid';

const isEmptyValue = (value: unknown) => {
    if (value === null || value === undefined) {
        return true;
    } else if (typeof value === 'string' && value === '') {
        return true;
    } else if (Array.isArray(value) && value.length === 0) {
        return true;
    } else if (value.constructor === Object && Object.entries(value).length === 0) {
        return true;
    }
    return false;
};

const parseEndpoint = (url: string, params: Record<string, string | number | boolean>) => {
    Object.keys(params).forEach((key) => {
        url = url.replace(key, `${key}=${params[key]}`);
    });
    return url;
};

function uuidGenerator(): string {
    return uuidv4();
}

export { isEmptyValue, parseEndpoint, uuidGenerator };
