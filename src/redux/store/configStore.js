import { createStore, combineReducers } from 'redux';
import transactionsReducer from '../reducers/transactions';
import tagsReducer from '../reducers/tags';
import paginationReducer from '../reducers/pagination';
import filtersReducer from '../reducers/filters';

const store = () => {
    const store = createStore(
        combineReducers({
            transactions: transactionsReducer,
            tags: tagsReducer,
            pagination: paginationReducer,
            filters: filtersReducer,
        })
    );
    return store;
};

export default store;
