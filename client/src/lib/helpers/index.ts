import { TResponseData } from "../types/Api";

const saveObjectLocalstorage = (key: string, value: TResponseData): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalstorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export {
    saveObjectLocalstorage,
    getFromLocalstorage
}