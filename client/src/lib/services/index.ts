import { BASE_API_URI } from "@/lib/constants";
import { TResponseData } from "../types/Api";

interface PostRequestData {
    [key: string]: string | number | boolean;
}

function handleResponse<TResponseData>(response: { ok: boolean }, data: { message?: string }): TResponseData | { error: true, message: string } | undefined {
    if (!response.ok) {
        let message: string = "";

        if (data?.message) {
            message = data.message;
        } else {
            message = 'An unknown error occurred';
        }

        return { error: true, message } as TResponseData;
    }

    return undefined;
}

const postRequest = async (url: string, body: PostRequestData): Promise<TResponseData> => {
    try {
        const response = await fetch(`${BASE_API_URI}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            let message: string = "";

            if (data?.message) {
                message = data.message;
            } else {
                message = 'An unknown error occurred';
            }

            return { error: true, message } as TResponseData;
        }

        const errorResponse = handleResponse<TResponseData>(response, data);

        if (errorResponse) {
            return errorResponse as TResponseData;
        }

        return data as TResponseData;


    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const updateRequest = async (url: string, body: PostRequestData): Promise<TResponseData> => {
    try {
        const response = await fetch(`${BASE_API_URI}/${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            let message: string = "";

            if (data?.message) {
                message = data.message;
            } else {
                message = 'An unknown error occurred';
            }

            return { error: true, message } as TResponseData;
        }

        const errorResponse = handleResponse<TResponseData>(response, data);

        if (errorResponse) {
            return errorResponse as TResponseData;
        }

        return data as TResponseData;


    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const getRequest = async (url: string): Promise<TResponseData> => {

    try {
        const response = await fetch(`${BASE_API_URI}/${url}`);

        const data = await response.json();

        const errorResponse = handleResponse<TResponseData>(response, data);

        if (errorResponse) {
            return errorResponse as TResponseData;
        }

        return data as TResponseData;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export {
    postRequest,
    getRequest,
    updateRequest
}