import { SESSION_LOGIN, SESSION_LOGOUT, SESSION_NOT_STARTED, SESSION_START } from '../actions/actionTypes';

const initialState = {
  loginUser: null,
  author: null,
  loading: false,
};

export default (state = initialState, action = {}) => {
  const {loginUser, author, loading} = action;
  switch (action.type) {
    case SESSION_NOT_STARTED:
      return state;
    case SESSION_LOGIN:
      return {
        ...state,
        loginUser,
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