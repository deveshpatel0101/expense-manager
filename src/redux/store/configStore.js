import { createStore, combineReducers } from 'redux';
import transactionsReducer from '../reducers/transactions';
import tagsReducer from '../reducers/tags';
import paginationReducer from '../reducers/pagination';

const store = () => {
    const store = createStore(
        combineReducers({
            transactions: transactionsReducer,
            tags: tagsReducer,
            pagination: paginationReducer,
        })
    );
    return store;
};

export default store;
