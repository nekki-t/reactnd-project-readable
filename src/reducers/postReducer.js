import {
  START_LOAD_POSTS, POSTS_LOADED, POSTS_LOAD_FAILED, POST_CREATE_FAILED,
  POST_CREATED, POST_CREATING, NEW_POST
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  posts: [],
  failed: false,
  errorMessage: '',
};

export default (state = initialState, action = {}) => {
  const { loading, posts, created, failed, errorMessage } = action;
  switch (action.type) {
    case START_LOAD_POSTS:
      return {
        ...state,
        loading,
      };
    case POSTS_LOADED:
      return {
        ...state,
        loading,
        posts,
      };
    case POSTS_LOAD_FAILED:
      return {
        ...state,
        loading,
        failed,
        errorMessage
      };
    case NEW_POST:
      return {
        ...state,
        loading,
        created,
      };
    case POST_CREATING:
      return {
        loading,
      };
    case POST_CREATED:
      return {
        ...state,
        loading,
        created,
      };
    case POST_CREATE_FAILED:
      return {
        ...state,
        loading,
        failed,
        errorMessage,
      };
    default:
      return state;
  }
};