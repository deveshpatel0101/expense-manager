export const addTransactions = (transactions = []) => ({
  type: 'ADD_TRANSACTIONS',
  transactions,
});

export const addTransaction = (transaction = {}) => ({
  type: 'ADD_TRANSACTION',
  transaction,
});
