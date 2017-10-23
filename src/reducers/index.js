import { combineReducers } from 'redux';
import category from './categoryReducer';
import post from './postReducer';

const rootReducer = combineReducers({
  category,
  post,
});
export default rootReducer;


