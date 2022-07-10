import moment from 'moment';

const filtersDefaultStore = {
    dateFilterOption: 'six-months',
    tagId: null,
    minAmount: null,
    maxAmount: null,
    fromDate: moment
        .utc(moment().subtract(5, 'months').startOf('month'))
        .format(),
    toDate: moment.utc(moment().endOf('month')).format(),
    text: null,
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
