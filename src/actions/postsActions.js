import { START_LOAD_POSTS, POSTS_LOADED } from './actionTypes';
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

export function loadPosts() {
  return dispatch => {
    dispatch(startPostsLoading());
    return readableApi.fetchPosts()
      .then(
        response => {
          dispatch(postsLoaded(response.data));
        }
      )
      .catch(error => {
        throw(error);
      });
  };
}
