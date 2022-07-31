export const updatePage = ({ page = 1 } = {}) => ({
    type: 'UPDATE_PAGE',
    pagination: {
        page,
    },
});

export const updatePerPage = ({ perPage = 10 } = {}) => ({
    type: 'UPDATE_PER_PAGE',
    pagination: {
        perPage,
    },
});

export const resetPagination = () => ({
    type: 'RESET_PAGINATION',
});
