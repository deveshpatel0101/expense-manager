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
    return response.json();
};
