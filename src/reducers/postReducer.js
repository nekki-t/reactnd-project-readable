import {
  START_LOAD_POSTS,
  POSTS_LOADED,
  POST_CREATED,
  POST_CREATING,
  NEW_POST,
  POST_VOTING,
  POST_DETAILS_LOADED,
  POST_UPDATING,
  POST_UPDATED,
  POST_DELETING,
  POST_DELETED,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  posts: [],
  post: {},
  failed: false,
  errorMessage: '',
};

export default (state = initialState, action = {}) => {
  const {
    loading,
    posts,
    post,
  } = action;
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
    case NEW_POST:
      return {
        ...state,
        loading,
      };
    case POST_CREATING:
      return {
        loading,
      };
    case POST_CREATED:
      return {
        ...state,
        loading,
      };
    case POST_UPDATING:
      return {
        ...state,
        loading,
      };
    case POST_UPDATED:
      return {
        ...state,
        loading,
      };
    case POST_DELETING:
      return {
        ...state,
        loading,
      };
    case POST_DELETED:
      return {
        ...state,
        loading,
      };
    case POST_DETAILS_LOADED:
      return {
        ...state,
        loading,
        post,
      };
    case POST_VOTING:
      return {
        ...state,
        loading,
      };
    default:
      return state;
  }
};