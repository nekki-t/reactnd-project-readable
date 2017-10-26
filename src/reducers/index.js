import { combineReducers } from 'redux';
import session from './sessionReducer';
import category from './categoryReducer';
import post from './postReducer';

const rootReducer = combineReducers({
  session,
  category,
  post,
});
export default rootReducer;


