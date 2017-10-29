import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/*--- Material UI ---*/
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
/*--- actions ---*/
import { login, create, sessionStart } from '../actions/sessionAction';
/*--- Shared ---*/
import { URL } from '../shared/constants';
/*--- Children ---*/
import Loading from './Loading';

class Login extends Component {

  constructor() {
    super();
    this.textInput = this.textInput.bind(this);
    this.login = this.login.bind(this);
    this.create = this.create.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      isLogin: true,
      username: 'test',
      password: 'test',
      userErrorText: '',
      passwordErrorText: '',
      loginErrorText: '',
    }
  }

  componentWillReceiveProps(nextState) {
    if (nextState.loggedIn) {
      this.context.router.push(URL.ROOT);
    }
  }

  textInput = (targetId, value) => {
    this.setState({
      [targetId]: value
    });
  };

  login = () => {
    if(this.validate()) {
      /*--- Login ---*/
      this.props.actions.login(this.state.username, this.state.password);
    }
  };

  start = () => {
    this.props.actions.sessionStart(this.props.user);
    window.location.href = URL.ROOT;
  };

  create = () => {
    /*--- Create a user ---*/
    if(this.validate()) {
      this.props.actions.create(this.state.username, this.state.password);
    }
  };


  validate = () => {
    if (this.state.username && this.state.password) {
      this.setState({
        userErrorText: '',
        passwordErrorText: '',
      });
      return true;
    }
    if (!this.state.username) {
      this.setState({
        userErrorText: 'Please input username.'
      });
    }
    if (!this.state.password) {
      this.setState({
        passwordErrorText: 'Please input password.'
      });
    }
    return false;
  };

  changeMode = (e, isLogin) => {
    e.preventDefault();
    this.setState({
      isLogin,
    });
  };


  render() {

    const actions = () => {
      if(this.state.isLogin) {
        return (
          <RaisedButton
            label="Login"
            primary={true}
            onClick={this.login}
          />
        )
      } else {
        return (
          <RaisedButton
            label="Create"
            secondary={true}
            onClick={this.create}
          />
        )
      }
    };

    const dialogTitle = () => {
      if(this.state.isLogin) {
        return (
          <div>
            Please input your username and password to <span style={styles.loginColor}>LOGIN</span>.
            <div style={styles.linkToTheOther}>
              Or <a onClick={(e) => this.changeMode(e, false)} href="#">Create User Account</a>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            Please input your username and password and push <span style={styles.createColor}>CREATE</span>.
            <div style={styles.linkToTheOther}>
              Or <a onClick={(e) => this.changeMode(e, true)} href="#">Login</a>
            </div>
          </div>
        );
      }
    };

    const styles = {};
    styles.loginErrorText = {
      color: 'red',
    };
    styles.linkToTheOther = {
      fontSize: 14,
    };
    styles.loginColor = {
      color: 'rgb(0, 188, 212)',
      fontWeight: '900'
    };
    styles.createColor = {
      color: 'rgb(255, 64, 129)',
      fontWeight: '900'
    };

    return (
      <div>
        {this.props.loading &&
        <Loading
          withOverLay={true}
        />
        }

        {!this.props.userCreated &&
        <Dialog
          title={dialogTitle()}
          actions={actions()}
          modal={true}
          open={true}
        >
          {this.props.errorMessage &&
          <p style={styles.loginErrorText}>
            {this.props.errorMessage}
          </p>
          }

          <div>
            <TextField
              id="username"
              hintText="username"
              floatingLabelText="username"
              fullWidth={true}
              value={this.state.username}
              onChange={(e) => this.textInput(e.target.id, e.target.value)}
              errorText={this.state.userErrorText}
            />
            <TextField
              id="password"
              hintText="password"
              floatingLabelText="password"
              fullWidth={true}
              value={this.state.password}
              onChange={(e) => this.textInput(e.target.id, e.target.value)}
              errorText={this.state.passwordErrorText}
              type="password"
            />
          </div>
        </Dialog>
        }
        {this.props.userCreated &&
        <div>
          <RaisedButton label="Dialog" onClick={this.handleOpen} />
          <Dialog
            title="User created"
            actions={
              <RaisedButton
                label="Start"
                primary={true}
                onClick={this.start}
              />
            }
            modal={true}
            open={this.props.userCreated}
          >
            Welcome <span style={styles.loginColor}>{this.props.user}</span>!<br/>
            Please push Start.
          </Dialog>
        </div>
        }

      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.session.loading,
  user: state.session.user,
  errorMessage: state.session.errorMessage,
  userCreated: state.session.userCreated,
  loggedIn: state.session.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ login, create, sessionStart }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);