import {
  START_LOAD_POSTS,
  POSTS_LOADED,
  POSTS_LOAD_FAILED,
  POST_CREATING,
  POST_CREATED,
  POST_CREATE_FAILED,
  NEW_POST,
  POST_DETAILS_LOADING,
  POST_DETAILS_LOADED,
  POST_DETAILS_LOAD_FAILED,
  POST_VOTING,
  POST_VOTE_FAILED,
} from './actionTypes';
import readableApi from '../api/readableApi';

export const startPostsLoading = () => ({
  type: START_LOAD_POSTS,
  loading: true,
  posts: [],
});

export const postsLoaded = (results) => ({
  type: POSTS_LOADED,
  loading: false,
  posts: results,
});

export const initializePost = () => ({
  type: NEW_POST,
  loading: false,
  created: false,
});

export const startPosting = () => ({
  type: POST_CREATING,
  loading: true,
});

export const postCreated = () => ({
  type: POST_CREATED,
  loading: false,
  created: true,
});

export const postsLoadFailed = (errorMessage) => ({
  type: POSTS_LOAD_FAILED,
  loading: false,
  failed: true,
  errorMessage,
});

export const postCreateFailed = (errorMessage) => ({
  type: POST_CREATE_FAILED,
  loading: false,
  failed: true,
  errorMessage,
});

export const postDetailsLoading = () => ({
  type: POST_DETAILS_LOADING,
  loading: true,
});

export const postDetailsLoaded = (post) => ({
  type: POST_DETAILS_LOADED,
  loading: false,
  post,
});

export const postDetailsLoadFailed = (errorMessage) => ({
  type: POST_DETAILS_LOAD_FAILED,
  loading: false,
  errorMessage,
});

export const postVoting = () => ({
  type: POST_VOTING,
  loading: true,
});

export const postVoteFailed = (errorMessage) => ({
  type: POST_VOTE_FAILED,
  loading: false,
  voteFailed: true,
  errorMessage,
});

export const loadPosts = () => {
  return dispatch => {
    dispatch(startPostsLoading());
    return readableApi.fetchPosts()
      .then(
        response => {
          dispatch(postsLoaded(response.data));
        }
      )
      .catch(error => {
        postsLoadFailed(error);
      });
  };
};

export const loadPost = (id) => {
  return dispatch => {
    dispatch(postDetailsLoading());
    return readableApi.getPost(id)
      .then(
        response => {
          dispatch(postDetailsLoaded(response.data));
        }
      )
      .catch(error => {
        postDetailsLoadFailed(error);
      })
  }
};

export const post = (post) => {
  return dispatch => {
    dispatch(startPosting());
    return readableApi.createPost(post)
      .then(
        response => {
          dispatch(postCreated());
        }
      ).catch(error => {
        postCreateFailed(error);
      })
  }
};

export const voteForPost = (id, voteString) => {
  return dispatch => {
    dispatch(postVoting());
    return readableApi.voteForPost(id, voteString)
      .then(
        response => {
          dispatch(loadPosts());
          dispatch(loadPost(id));
        }
      ).catch(error => {
        postVoteFailed(error);
      })
  }
};
