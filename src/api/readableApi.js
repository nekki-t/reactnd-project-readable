import { API } from '../shared/constants';
import axios from 'axios';
import { POST_ATTR } from '../shared/constants';

class ReadableApi {

  /* === < Categories > =================================================================== */
  static fetchCategories() {
    return axios.get(
      API.categories,
      API.headers,
    )
  }
  /* === < Posts > =================================================================== */
  static fetchPosts() {
    return axios.get(
      API.posts,
      API.headers,
    )
  }

  static createPost (post) {
    return axios.post(
      API.posts,
      post,
      API.headers
    )
  }

  static voteForPost(id, option) {
    return axios.post(
      API.post_vote.replace(API.params.id, id),
      {option},
      API.headers,
    )
  }
}

export default ReadableApi;