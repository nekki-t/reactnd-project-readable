const delay = 1000;
const localStorage = window.localStorage;

class sessionApi {
  static isLoggedIn() {
    const{ udacityCurrentLoginUser } = localStorage;
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
    let { udacityUsers } = localStorage;
    let errorMessage = '';
    if(!udacityUsers) {
      errorMessage = 'No user has been created yet. Please create a user to begin.'
    } else {
      udacityUsers = JSON.parse(udacityUsers);
      const targetUser = udacityUsers.find(user => user.name === username);

      if(targetUser) {
        if(targetUser.password !== password) {
          // failed...
          errorMessage = "Your username or password is incorrect. Please check it and try again."
        }
      } else {
        errorMessage = `Username "${username}" does not exist. Please make sure the username.`
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ username, errorMessage});
      }, delay);
    });
  }

  static create(username, password) {
    let udacityUsers = localStorage.udacityUsers;
    const user = {name: username, password: password};
    let errorMessage = '';

    if(!udacityUsers) {
      localStorage.udacityUsers = JSON.stringify([user]);
    } else {
      udacityUsers = JSON.parse(udacityUsers);
      const targetUser = udacityUsers.find(user => user.name === username);
      if(targetUser) {
        errorMessage = 'the username is already used. Please try again with a different username.'
      } else {
        udacityUsers.push(user);
        localStorage.udacityUsers = JSON.stringify([udacityUsers]);
        localStorage.udacityCurrentLoginUser = username;
      }
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({username, errorMessage})
      });
    });
  }

  static logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('udacityCurrentLoginUser');
        resolve({ username: null })
      })
    });
  }
}

export default sessionApi;