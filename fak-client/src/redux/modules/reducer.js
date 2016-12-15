import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';
import {reducer as form} from 'redux-form';
import book from './book'
import auth from './auth'
import register from './register'
export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  pagination,
  book,
  auth,
  register
});
