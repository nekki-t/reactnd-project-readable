import { API } from '../shared/constants';
import axios from 'axios';

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

  static getPost(id) {
    return axios.get(
      API.post.replace(API.params.id, id),
      API.headers,
    )
  }

  static voteForPost(id, option) {
    return axios.post(
      API.post_vote.replace(API.params.id, id),
      {option},
      API.headers,
    )
  }

  static updatePost(id, params) {
    return axios.put(
      API.updatePost.replace(API.params.id, id),
      params,
      API.headers
    );
  }

  static deletePost(id) {
    return axios.delete(
      API.deletePost.replace(API.params.id, id),
      API.headers,
    )
  }

  /* === < Comments > =================================================================== */
  static fetchComments(postId) {
    return axios.get(
      API.comments.replace(API.params.id, postId),
      API.headers,
    )
  }

  static createComment(comment) {
    return axios.post(
      API.createComment,
      comment,
      API.headers,
    )
  }

  static updateComment(id, params) {
    return axios.put(
      API.updateComment.replace(API.params.id, id),
      params,
      API.headers,
    )
  }

  static deleteComment(id) {
    return axios.delete(
      API.deleteComment.replace(API.params.id, id),
      API.headers,
    )
  }

  static voteForComment(id, option) {
    return axios.post(
      API.comment_vote.replace(API.params.id, id),
      {option},
      API.headers,
    )
  }
}

export default ReadableApi;