import {
  SESSION_LOAD,
  SESSION_LOGIN,
  SESSION_START,
  SESSION_LOGOUT,
  SESSION_TERMINATED, SESSION_NOT_STARTED,
} from './actionTypes';

import sessionApi from '../api/sessionApi';

export const sessionNotStarted = () => ({
  type: SESSION_NOT_STARTED,
});

export const startLogin = () => ({
  type: SESSION_LOGIN,
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
          if(response.author) {
            dispatch(sessionStart(response.author));
          } else {
            dispatch(sessionNotStarted());
          }
        }
      );
  }
};

export const login = (author) => {
  return (dispatch) => {
    dispatch(startLogin());
    return sessionApi.login(author)
      .then(
        response => {
          dispatch(sessionStart(response.author))
        }
      )
  };
};