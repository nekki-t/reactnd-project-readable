import { SESSION_ACCESSING, SESSION_LOGOUT, SESSION_NOT_STARTED, SESSION_START } from '../actions/actionTypes';

const initialState = {
  author: null,
  loading: false,
};

export default (state = initialState, action = {}) => {
  const { author, loading} = action;
  switch (action.type) {
    case SESSION_NOT_STARTED:
      return state;
    case SESSION_ACCESSING:
      return {
        ...state,
        loading,
      };
    case SESSION_START:
      if (author) {
        return {
          ...state,
          author,
          loading,
        }
      }
      return {
        ...state,
        loading,
      };
    case SESSION_LOGOUT:
      return {};
    default:
      return state;
  }
}