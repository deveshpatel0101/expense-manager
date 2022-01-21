const URL = 'https://dp-expense-manager-api.herokuapp.com';
export const getTransactions = async (page = 1, perPage = 10, filters = {}) => {
    let filteredURL = `${URL}/transactions?page=${page}&perPage=${perPage}`;
    for (let prop in filters) {
        filteredURL += `&${prop}=${filters[prop]}`;
    }

    const response = await fetch(filteredURL, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const addTransaction = async (data) => {
    const response = await fetch(`${URL}/transactions`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    });
    return response.json;
};

export const updateTransaction = async (data) => {
    const response = await fetch(`${URL}/transactions`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    });
    return response.json;
};

export const deleteTransaction = async (data) => {
    const response = await fetch(`${URL}/transactions`, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    });
    return response.json;
};
