const SAVE = 'register/SAVE';
const SAVE_SUCCESS = 'register/SAVE_SUCCESS';
const SAVE_FAIL = 'register/SAVE_FAIL';
const TOGGLE_REGISTER = 'register/TOGGLE_REGISTER'

const initialState = {
  openRegister: false
};

export default function reducer(state = initialState, action = {}) {
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
    case TOGGLE_REGISTER:
      return {
        ...state,
        openRegister: !state.openRegister,
        saveError: null
      };
    default:
      return {
        ...state
      }
  }
}

export function registerUser(user) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/strapi/user', {
      data: user
    })
  };
}
export function toggleRegister() {
  return {
    type: TOGGLE_REGISTER
  }
}
