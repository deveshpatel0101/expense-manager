const transactionsDefaultState = [];

const transactionsReducer = (state = transactionsDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTIONS':
      return state.concat(action.transactions);
    case 'ADD_TRANSACTION':
      return state.concat([action.transaction]);
    case 'REMOVE_ALL':
      return [];
    default:
      return state;
  }
};

export default transactionsReducer;
