const URL = 'https://expense-manager-api.cyclic.app';

export const getStats = async (query) => {
    const urlQueries = [];
    for (let prop in query) {
        urlQueries.push(`${prop}=${query[prop]}`);
    }
    const response = await fetch(
        `${URL}/transactions/stats?${urlQueries.join('&')}`,
        {
            headers: {
                Authorization: sessionStorage.getItem('token'),
            },
        }
    );
    return response.json();
};
