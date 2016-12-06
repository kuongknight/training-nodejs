import {LOAD_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../modules/auth'
import cookie from 'react-cookie'
export default function loginMiddleware({ getState }) {
  return (next) => (action) => {
    const result = next(action);
    if (action.type === LOGIN_SUCCESS || action.type === LOAD_SUCCESS) {
      cookie.save('session_user', JSON.stringify(getState().auth.user), { path: '/' });
    }
    if (LOGOUT_SUCCESS) {
      cookie.remove('session_user', { path: '/' });
    }
    return result
  }
}
