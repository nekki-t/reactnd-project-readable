import { API } from '../constants';
import axios from 'axios';

class ReadableApi {

  /* === < Categories > =================================================================== */
  static fetchCategories() {
    return axios.get
    (
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

}

export default ReadableApi;