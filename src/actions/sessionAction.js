import {
  SESSION_LOAD,
  SESSION_ACCESSING,
  SESSION_START,
  SESSION_LOGOUT,
  SESSION_TERMINATED,
  SESSION_NOT_STARTED,
  SESSION_USER_CREATED,
  SESSION_USER_NOT_CREATED,
} from './actionTypes';

import sessionApi from '../api/sessionApi';

import { loadCategories } from './categoriesAction';
import { loadPosts } from './postsActions';

import { URL } from '../shared/constants';

export const sessionNotStarted = (errorMessage) => ({
  type: SESSION_NOT_STARTED,
  loading: false,
  errorMessage,
});

export const startAccessing = () => ({
  type: SESSION_ACCESSING,
  loading: true,
});

export const sessionStart = (username) => ({
  type: SESSION_START,
  loading: false,
  user: username,
});

export const userCreated = (username) => ({
  type: SESSION_USER_CREATED,
  loading: false,
  user: username,
  userCreated: true,
});

export const userNotCreated = (errorMessage) => ({
  type: SESSION_USER_NOT_CREATED,
  loading: false,
  errorMessage,
});

export const initialize = () => {
  return (dispatch) => {
    return sessionApi.isLoggedIn()
      .then(
        response => {
          if (response.username) {
            startUp(dispatch, response.username, false);
          } else {
            window.location.href = URL.LOGIN;
          }
        }
      );
  }
};

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(startAccessing());
    return sessionApi.login(username, password)
      .then(
        response => {
          if(response.errorMessage) {
            dispatch(sessionNotStarted(response.errorMessage));
          } else {
            startUp(dispatch, response.username, true);
            window.location.href = URL.ROOT;
          }
        }
      )
  };
};

export const create = (username, password) => {
  return (dispatch) => {
    dispatch(startAccessing());
    return sessionApi.create(username, password)
      .then(
        response => {
          if(response.errorMessage) {
            dispatch(userNotCreated(response.errorMessage))
          } else {
            dispatch(userCreated(username));
          }
        }
      )
  }
};

export const logout = () => {
  return (dispatch) => {
    dispatch(startAccessing());
    return sessionApi.logout()
      .then(
        _ => {
          window.location.href = URL.LOGIN;
        }
      );
  }
};


const startUp = (dispatch, user) => {
  dispatch(sessionStart(user));
  dispatch(loadCategories());
};