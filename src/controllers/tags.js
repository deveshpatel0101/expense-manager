import { validateResponse } from '../utils/validateResponse';

const URL = window.location.host.includes('localhost') ? 'http://localhost:5000' : 'https://expense-manager-api.cyclic.app';

export const getTags = async (page = 1, perPage = 100) => {
    const response = await fetch(
        `${URL}/tags?page=${page}&perPage=${perPage}`,
        {
            headers: {
                Authorization: sessionStorage.getItem('token'),
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
            Authorization: sessionStorage.getItem('token'),
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
            Authorization: sessionStorage.getItem('token'),
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
            Authorization: sessionStorage.getItem('token'),
        },
    });
    validateResponse(response);
    return response.json();
};
