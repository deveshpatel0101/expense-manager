import { validateResponse } from '../utils/validateResponse';

const URL = 'https://dp-expense-manager-api.herokuapp.com';

export const getTags = async (page = 1, perPage = 10) => {
    const response = await fetch(
        `${URL}/tags?page=${page}&perPage=${perPage}`,
        {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        }
    );
    validateResponse(response);
    return response.json();
};

export const addTag = async (data) => {
    const response = await fetch(`${URL}/tags`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    });
    validateResponse(response);
    return response.json();
};

export const updateTag = async (data) => {
    const response = await fetch(`${URL}/tags`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    });
    validateResponse(response);
    return response.json();
};

export const deleteTag = async (data) => {
    const response = await fetch(`${URL}/tags`, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    });
    validateResponse(response);
    return response.json();
};
