import { validateResponse } from '../utils/validateResponse';

const URL = window.location.host.includes('localhost') ? 'http://localhost:5000' : 'https://expense-manager-api.cyclic.app';

const filtersToSend = {
    fromDate: true,
    toDate: true,
    minAmount: true,
    maxAmount: true,
    text: true,
    page: true,
    perPage: true,
    tagId: true,
};

export const getTransactions = async (page = 1, perPage = 10, filters = {}) => {
    let filteredURL = `${URL}/transactions?page=${page}&perPage=${perPage}`;
    for (let prop in filters) {
        if (
            prop in filtersToSend &&
            filters[prop] !== null &&
            filters[prop] !== undefined
        ) {
            filteredURL += `&${prop}=${filters[prop]}`;
        }
    }

    const response = await fetch(filteredURL, {
        headers: {
            Authorization: sessionStorage.getItem('token'),
        },
    });
    validateResponse(response);
    return response.json();
};

export const addTransaction = async (data) => {
    const response = await fetch(`${URL}/transactions`, {
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

export const updateTransaction = async (data) => {
    const response = await fetch(`${URL}/transactions`, {
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

export const deleteTransaction = async (data) => {
    const response = await fetch(`${URL}/transactions`, {
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
