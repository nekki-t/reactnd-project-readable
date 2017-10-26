const delay = 1000;
const localStorage = window.localStorage;

class sessionApi {

  static isLoggedIn() {
    const { loginAuthor } = localStorage;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (loginAuthor) {
          resolve({loginAuthor});
        } else {
          resolve({loginAuthor: null});
        }
      }, delay);
    });
  }

  static login(author) {
    const { authors } = localStorage;
    return new Promise((resolve) => {
      setTimeout(() => {
        if(authors && authors[author]) {
          resolve({author});
        } else {
          resolve({author: null})
        }
      }, delay);
    });
  }

  static createUser(user, password) {
  }
}

export default sessionApi;