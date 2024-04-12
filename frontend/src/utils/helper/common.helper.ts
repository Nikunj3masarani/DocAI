import { Option } from '@docAi-app/types/common.type';
export const isEmptyValue = (value: unknown) => {
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

export const onLoadReaders = async (
    searchString: string,
    readersList: Option[] = [],
): Promise<{ options: Option[] }> => {
    return {
        options:
            readersList.length === 0
                ? []
                : readersList.filter((reader) => reader.label.toLowerCase().indexOf(searchString.toLowerCase()) > -1),
    };
};

export const parseEndpoint = (url: string, params: Record<string, string | number | boolean>) => {
    Object.keys(params).forEach((key) => {
        url = url.replace(key, `${key}=${params[key]}`);
    });
    return url;
};

export function uuidGenerator(): string {
    return crypto.randomUUID();
}
