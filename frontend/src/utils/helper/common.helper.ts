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
