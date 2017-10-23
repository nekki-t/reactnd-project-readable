import { API } from '../constants';

const delay = 1000;

class loginApi {

  /* === < Categories > =================================================================== */
  static login() {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({user: 'user'});
      }, delay);
    });
  }

  static createUser(user, password) {

  }


}

export default ReadableApi;