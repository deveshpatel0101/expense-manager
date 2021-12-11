import { createStore, combineReducers } from 'redux';
import keysReducer from '../reducers/keys';
import transactionsReducer from '../reducers/transactions';

const store = () => {
  const store = createStore(
    combineReducers({
      keys: keysReducer,
      transactions: transactionsReducer,
    })
  );
  return store;
};

export default store;
