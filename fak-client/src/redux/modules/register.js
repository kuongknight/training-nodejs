const SAVE = 'register/SAVE';
const SAVE_SUCCESS = 'register/SAVE_SUCCESS';
const SAVE_FAIL = 'register/SAVE_FAIL';

export default function info(state = {}, action = {}) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        loading: true
      }
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        registedUser: action.result,
        saveError: null
      }
    case SAVE_FAIL:
      return {
        ...state,
        loading: false,
        registedUser: null,
        saveError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export function save(user) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/strapi/user', {
      data: user
    })
  };
}
