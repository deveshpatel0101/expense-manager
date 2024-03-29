import { validateResponse } from '../utils/validateResponse';

const URL = 'https://expense-manager-api.helioho.st';

export const getStats = async (query) => {
    const urlQueries = [];
    for (let prop in query) {
        urlQueries.push(`${prop}=${query[prop]}`);
    }
    urlQueries.push(`timezone=${getTimeZone()}`);
    const response = await fetch(
        `${URL}/transactions/stats?${urlQueries.join('&')}`,
        {
            headers: {
                Authorization: sessionStorage.getItem('token'),
            },
        }
    );
    validateResponse(response);
    return response.json();
};

const getTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
