export const paginationDefaultState = { page: 1, perPage: 10 };

const paginationReducer = (state = paginationDefaultState, action) => {
    switch (action.type) {
        case 'UPDATE_PAGE':
            return {
                ...state,
                page: action.pagination.page,
            };
        case 'UPDATE_PER_PAGE':
            return {
                ...state,
                perPage: action.pagination.perPage,
            };
        case 'RESET_PAGINATION':
            return {
                ...state,
                page: paginationDefaultState.page,
                perPage: paginationDefaultState.perPage,
            };
        default:
            return state;
    }
};

export default paginationReducer;
