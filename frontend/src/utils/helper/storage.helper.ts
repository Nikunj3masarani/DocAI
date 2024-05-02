import { CURRENT_USER_EMAIL, ACCESS_TOKEN_KEY, USER_UUID, REDIRECT_URL } from '../constants/storage.constant';

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

const clearLocalStorage = () => {
    removeFromLocalStorage(CURRENT_USER_EMAIL);
    removeFromLocalStorage(ACCESS_TOKEN_KEY);
    removeFromLocalStorage(USER_UUID);
    removeFromLocalStorage(REDIRECT_URL);
};

export { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage, clearLocalStorage };
