export const getFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
};

export const removeFromStore = (key: string) => {
    localStorage.removeItem(key);
};
