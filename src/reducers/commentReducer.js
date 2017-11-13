import {
  COMMENT_LOADING,
  COMMENT_LOADED,
  COMMENT_CREATED,
  COMMENT_UPDATING,
  COMMENT_UPDATED,
  COMMENT_VOTING,
  COMMENT_DELETING,
  COMMENT_DELETED,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  comments: [],
  comment: null,
  commentCreated: false,
};

export default (state = initialState, action = {}) => {
  const {
    loading,
    comments,
  } = action;

  switch (action.type) {
    case COMMENT_LOADING:
      return {
        ...state,
        loading,
        comments,
      };
    case COMMENT_LOADED:
      return {
        ...state,
        loading,
        comments,
      };
    case COMMENT_VOTING:
      return {
        ...state,
        loading,
      };
    case COMMENT_CREATED:
      return {
        ...state,
        loading,
      };
    case COMMENT_UPDATING:
      return {
        ...state,
        loading,
      };
    case COMMENT_UPDATED:
      return {
        ...state,
        loading,
      };
    case COMMENT_DELETING:
      return {
        ...state,
        loading,
      };
    case COMMENT_DELETED:
      return {
        ...state,
        loading,
      };

    default:
      return state;
  }
};