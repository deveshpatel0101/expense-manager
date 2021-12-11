const keysDefaultState = { client_email: '', private_key: '' };

const keysReducer = (state = keysDefaultState, action) => {
  switch (action.type) {
    case 'ADD_KEYS':
      return {
        ...state,
        client_email: action.keys.client_email,
        private_key: action.keys.private_key,
      };
    default:
      return state;
  }
};
export default keysReducer;
