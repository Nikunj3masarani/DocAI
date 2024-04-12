const getFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
};

const setToLocalStorage = (key: string, obj = {}) => {
    localStorage.setItem(key, JSON.stringify(obj));
};

const removeFromLocalStorage = (key: string) => {
    const item = getFromLocalStorage(key);
    if (item) {
        localStorage.removeItem(key);
        return true;
    } else {
        return false;
    }
};

export { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage };
