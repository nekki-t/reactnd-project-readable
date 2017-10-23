import { START_LOAD_CATEGORIES, CATEGORIES_LOADED } from '../actions/actionTypes';

const initialState = {
  loading: false,
  categories: []
};

export default function categoryReducer (state = initialState, action = {}) {
  const { loading, categories } = action;

  switch(action.type) {
    case START_LOAD_CATEGORIES:
      return {
        ...state,
        loading,
      };
    case CATEGORIES_LOADED:
      return {
        ...state,
        loading,
        categories,
      };
    default:
      return state;
  }
}