export const updatePagination = ({ page = 1, perPage = 20 } = {}) => ({
    type: 'UPDATE_PAGINATION',
    pagination: {
        page,
        perPage,
    },
});
