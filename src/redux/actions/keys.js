export const addKeys = ({ client_email = '', private_key = '' } = {}) => ({
  type: 'ADD_KEYS',
  keys: {
    client_email,
    private_key,
  },
});
