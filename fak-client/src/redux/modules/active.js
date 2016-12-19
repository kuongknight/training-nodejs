const ACTIVE = 'ACTIVE/SAVE';
const ACTIVE_SUCCESS = 'active/ACTIVE_SUCCESS';
const ACTIVE_FAIL = 'active/ACTIVE_FAIL';

const initialState = {
  isActive: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIVE:
      return {
        ...state,
        loading: true
      }
    case ACTIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        activedUser: action.result,
        isActive: true,
        saveError: null
      }
    case ACTIVE_FAIL:
      return {
        ...state,
        loading: false,
        activedUser: null,
        isActive: false,
        saveError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export function load(globalState) {
  return globalState.activeAccount && globalState.activeAccount.isActive;
}

export function active(token) {
  return {
    types: [ACTIVE, ACTIVE_SUCCESS, ACTIVE_FAIL],
    promise: (client) => client.post('/strapi/active/' + token)
  };
}
