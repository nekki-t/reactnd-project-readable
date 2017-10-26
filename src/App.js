import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './App.css';
/*--- Material UI ---*/
import AppBar from 'material-ui/AppBar';
/*--- Constants ---*/
import { URL } from './shared/constants';
/*--- Components ---*/
import SideBar from './components/SideBar';
import Main from './components/Main';
import Login from './components/Login';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {categoryBarOpened: false};

    this.toggleCategoryBar = this.toggleCategoryBar.bind(this);
  }

  toggleCategoryBar() {
    this.setState({
      categoryBarOpened: !this.state.categoryBarOpened
    });
  }

  render() {
    const styles = {};
    styles.appBar = {
      backgroundColor: '#3F51B5'
    };
    styles.title = {
      cursor: 'pointer'
    };

    const location = this.context.router.route.location;

    return (
      <div className="base">
        <AppBar
          title="Readable"
          style={styles.appBar}
          titleStyle={styles.title}
          onLeftIconButtonTouchTap={this.toggleCategoryBar}
          onTitleTouchTap={() => this.context.router.history.push(URL.ROOT)}
        />
        <div>
          <SideBar
            opened={this.state.categoryBarOpened}
            requestChange={this.toggleCategoryBar}
          />
          <ReactCSSTransitionGroup
            transitionName="transition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
              <Switch location={location} key={location.key}>
                <Route exact={true} path={URL.ROOT} component={Main}/>
                <Route path={URL.LOGIN} component={Login}/>
              </Switch>
          </ReactCSSTransitionGroup>

        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(App);
