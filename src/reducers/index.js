import { combineReducers } from 'redux';
import session from './sessionReducer';
import category from './categoryReducer';
import post from './postReducer';
import comment from './commentReducer';

const rootReducer = combineReducers({
  session,
  category,
  post,
  comment,
});
export default rootReducer;


