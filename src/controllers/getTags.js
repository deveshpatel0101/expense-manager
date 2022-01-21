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
