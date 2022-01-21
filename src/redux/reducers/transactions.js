const transactionsDefaultState = [];

const transactionsReducer = (state = transactionsDefaultState, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return action.transactions;
        default:
            return state;
    }
};

export default transactionsReducer;
