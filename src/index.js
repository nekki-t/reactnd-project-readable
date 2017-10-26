import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { URL } from './shared/constants';

import injectTapEventPlugin from 'react-tap-event-plugin';
import createStore from "./createStore";

import { initialize } from './actions/sessionAction';

injectTapEventPlugin();

const store = createStore();
if (window.location.pathname !== URL.LOGIN) {
  store.dispatch(initialize());
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
