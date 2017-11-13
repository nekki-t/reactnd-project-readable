import {
  START_LOAD_POSTS,
  POSTS_LOADED,
  POST_CREATING,
  POST_CREATED,
  POST_UPDATING,
  POST_UPDATED,
  POST_DELETING,
  POST_DELETED,
  POST_DETAILS_LOADING,
  POST_DETAILS_LOADED,
  POST_VOTING,
} from './actionTypes';
import readableApi from '../api/readableApi';

export const loadPosts = () => {
  return dispatch => {
    dispatch({
      type: START_LOAD_POSTS,
      loading: true,
      posts: [],
    });
    return readableApi.fetchPosts()
      .then(
        response => {
          dispatch({
            type: POSTS_LOADED,
            loading: false,
            posts: response.data,
          });
        }
      )
  };
};

export const loadPost = (id) => {
  return dispatch => {
    dispatch({
      type: POST_DETAILS_LOADING,
      loading: true,
    });
    return readableApi.getPost(id)
      .then(
        response => {
          dispatch({
            type: POST_DETAILS_LOADED,
            loading: false,
            post: response.data,
          });
        }
      )
  }
};

export const post = (post) => {
  return dispatch => {
    dispatch({
      type: POST_CREATING,
      loading: true,
    });
    return readableApi.createPost(post)
      .then(
        response => {
          dispatch({
            type: POST_CREATED,
            loading: false,
          });
        }
      )
  }
};

export const updatePost = (id, params) => {
  return dispatch => {
    dispatch({
      type: POST_UPDATING,
      loading: true,
    });
    return readableApi.updatePost(id, params)
      .then(
        response => {
          dispatch({
            type: POST_UPDATED,
            loading: false,
          })
        }
      );
  }
};

export const deletePost = (id) => {
  return dispatch => {
    dispatch({
      type: POST_DELETING,
      loading: true,
    });
    return readableApi.deletePost(id)
      .then(
        response => {
          dispatch({
            type: POST_DELETED,
          });
        }
      )
  }
};


export const voteForPost = (id, voteString) => {
  return dispatch => {
    dispatch({
      type: POST_VOTING,
      loading: true,
    });
    return readableApi.voteForPost(id, voteString)
      .then(
        response => {
          dispatch(loadPosts());
          dispatch(loadPost(id));
        }
      )
  }
};
