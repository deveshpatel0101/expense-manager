import moment from 'moment';

const filtersDefaultStore = {
    tagId: null,
    minAmount: null,
    maxAmount: null,
    fromDate: moment.utc(moment().startOf('month')).format(),
    toDate: moment.utc(moment().endOf('month')).format(),
};

const filtersReducer = (state = filtersDefaultStore, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return { ...state, ...action.filters };
        default:
            return state;
    }
};

export default filtersReducer;
