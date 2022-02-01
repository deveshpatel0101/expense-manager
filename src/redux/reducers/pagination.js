export const paginationDefaultState = { page: 1, perPage: 20 };

const paginationReducer = (state = paginationDefaultState, action) => {
    switch (action.type) {
        case 'UPDATE_PAGINATION':
            return {
                ...state,
                page: action.pagination.page,
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
