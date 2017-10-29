import { START_LOAD_POSTS, POSTS_LOADED } from '../actions/actionTypes';

const initialState = {
  loading: false,
  posts: []
};

export default (state = initialState, action = {}) => {
  const { loading, posts } = action;
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
    default:
      return state;
  }
};