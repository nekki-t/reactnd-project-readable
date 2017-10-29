const delay = 1000;
const localStorage = window.localStorage;

class sessionApi {

  static isLoggedIn() {
    const { udacityCurrentLoginUser } = localStorage;
    return new Promise((resolve) => {
      // imitating asynchronous time...
      setTimeout(() => {
        if (udacityCurrentLoginUser) {
          resolve({username: udacityCurrentLoginUser});
        } else {
          resolve({username: null});
        }
      }, delay);
    });
  }

  static login(username, password) {
    const { udacityUsers } = localStorage;
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.udacityCurrentLoginUser = username;
        resolve({ username });
      }, delay);
    });
  }

  static logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.udacityCurrentLoginUser = null;
        resolve({ username: null })
      })
    });

  }
}

export default sessionApi;