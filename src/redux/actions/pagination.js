export const updatePagination = ({ page = 1, perPage = 10 } = {}) => ({
    type: 'UPDATE_PAGINATION',
    pagination: {
        page,
        perPage,
    },
});

export const resetPagination = () => ({
    type: 'RESET_PAGINATION',
});
