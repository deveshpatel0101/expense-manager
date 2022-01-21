const tagsDefaultStore = [];

const tagsReducer = (state = tagsDefaultStore, action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.tags;
        default:
            return state;
    }
};

export default tagsReducer;
