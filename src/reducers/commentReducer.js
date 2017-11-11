import {
  COMMENT_LOADING,
  COMMENT_LOADED,
  COMMENT_CREATING,
  COMMENT_CREATED,
  COMMENT_UPDATING,
  COMMENT_UPDATED,
  COMMENT_VOTING,
  COMMENT_VOTED,
  COMMENT_DELETING,
  COMMENT_DELETED,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  comments: [],
  comment: null,
  errorMessage: '',
};

export default (state = initialState, action = {}) => {
  const {
    loading,
    comments,
    comment,
    errorMessage,
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
    default:
      return state;
  }
};