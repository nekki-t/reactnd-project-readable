import {
  SESSION_LOAD,
  SESSION_ACCESSING,
  SESSION_START,
  SESSION_LOGOUT,
  SESSION_TERMINATED, SESSION_NOT_STARTED,
} from './actionTypes';

import sessionApi from '../api/sessionApi';

import { loadCategories } from './categoriesAction';
import { loadPosts } from './postsActions';

import { URL } from '../shared/constants';

export const sessionNotStarted = () => ({
  type: SESSION_NOT_STARTED,
});

export const startAccessing = () => ({
  type: SESSION_ACCESSING,
  loading: true,
});

export const sessionStart = (author) => ({
  type: SESSION_START,
  loading: false,
  author: author
});

export const initialize = () => {
  return (dispatch) => {
    return sessionApi.isLoggedIn()
      .then(
        response => {
          if (response.author) {
            startUp(dispatch, response.author);
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
          if(response.username) {
            startUp(dispatch, response.author);
          }
          return response.username;
        }
      )
  };
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



const startUp = (dispatch, author) => {
  dispatch(sessionStart(author));
  dispatch(loadPosts(author));
  dispatch(loadCategories());
};