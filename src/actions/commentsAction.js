import {
  COMMENT_LOADING,
  COMMENT_LOADED,
  COMMENT_CREATING,
  COMMENT_CREATED,
  COMMENT_UPDATING,
  COMMENT_UPDATED,
  COMMENT_DELETING,
  COMMENT_DELETED,
  COMMENT_VOTING,
  COMMENT_VOTED,
} from './actionTypes';

import readableApi from '../api/readableApi';

import { loadPost } from './postsAction';

export const loadComments = (postId) => {
  return dispatch => {
    dispatch({
      type: COMMENT_LOADING,
      loading: true,
    });
    return readableApi.fetchComments(postId)
      .then(
        response => {
          dispatch({
            type: COMMENT_LOADED,
            comments: response.data,
            loading: false,
          })
        }
      )
  }
};

export const voteForComment = (postId, id, voteString) => {
  return dispatch => {
    dispatch({
      type: COMMENT_VOTING,
      loading: true,
    });
    return readableApi.voteForComment(id, voteString)
      .then(
        response => {
          dispatch(loadComments(postId));
          dispatch(loadPost(postId));
        }
      ).catch(error => {
        throw error;
      })
  };
};