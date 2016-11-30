import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';
import {reducer as form} from 'redux-form';
import info from './info';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  info,
  pagination
});
