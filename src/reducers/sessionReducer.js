import {
  SESSION_ACCESSING,
  SESSION_LOGOUT,
  SESSION_NOT_STARTED,
  SESSION_USER_CREATED,
  SESSION_USER_NOT_CREATED,
  SESSION_START
} from '../actions/actionTypes';

const initialState = {
  user: null,
  loading: false,
  userCreated: false,
};

export default (state = initialState, action = {}) => {
  const { user, loading, errorMessage, userCreated } = action;
  switch (action.type) {
    case SESSION_NOT_STARTED:
      return {
        ...state,
        loading,
        errorMessage,
      };
    case SESSION_ACCESSING:
      return {
        ...state,
        loading,
      };
    case SESSION_USER_CREATED:
      return {
        ...state,
        loading,
        user,
        userCreated,
      };
    case SESSION_USER_NOT_CREATED:
      return {
        ...state,
        loading,
        errorMessage,
      };
    case SESSION_START:
      return {
        ...state,
        user,
        loading,
      };
    case SESSION_LOGOUT:
      return {};
    default:
      return state;
  }
}