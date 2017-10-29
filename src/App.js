import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts } from './actions/postsActions';
import { logout } from './actions/sessionAction';
/*--- CSS ---*/
import './App.css';
/*--- Material UI ---*/
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
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
    this.titleClick = this.titleClick.bind(this);
  }

  toggleCategoryBar() {
    this.setState({
      categoryBarOpened: !this.state.categoryBarOpened
    });
  }

  titleClick = () => {
    this.context.router.history.push(URL.ROOT);
    this.props.actions.loadPosts();
  };

  logout = () => {
    this.props.actions.logout();
  };

  render() {
    const styles = {};
    styles.appBar = {
      backgroundColor: '#3F51B5'
    };
    styles.title = {
      cursor: 'pointer'
    };

    const location = this.context.router.route.location;

    const appbarTitle = (
      <span
        style={styles.title}
        onClick={this.titleClick}>
              Readable
      </span>
    );

    const logoutButton =() => {
      if (this.props.username) {
        return (
          <RaisedButton
            label="ログアウト"
            onClick={this.logout}
            style={{marginTop: 5}}
          />
        )
      }
    };

    return (
      <div className="base">
        <AppBar
          title={appbarTitle}
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.toggleCategoryBar}
          iconElementRight={logoutButton()}
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

const mapStateToProps = (state) => ({
  loading: state.session.loading,
  username: state.session.username,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadPosts, logout}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
