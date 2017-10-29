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
import { login } from '../actions/sessionAction';

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

    this.state = {
      isLogin: true,
      username: '',
      password: '',
      userErrorText: '',
      passwordErrorText: '',
      loginErrorText: '',
    }
  }

  textInput = (targetId, value) => {
    console.log(targetId, value);
    this.setState({
      [targetId]: value
    });
  };

  login = () => {
    if (this.state.username && this.state.password) {
      this.setState({
        userErrorText: '',
        passwordErrorText: '',
      });
      this.props.actions.login(this.state.username, this.state.password)
        .then(
          response => {
            if(response.username) {
              this.context.router.history.push(URL.ROOT)
            } else {
              this.setState({
                loginErrorText: 'Login denied. Please input proper username and password or create a new account.'
              });
            }
          }
        )
    } else {
      if(!this.state.username) {
        this.setState({
          userErrorText: 'Please input username.'
        });
      }
      if(!this.state.password) {
        this.setState({
          passwordErrorText: 'Please input password.'
        });
      }
    }
  };

  create = () => {
  };

  changeMode = (e) => {
    e.preventDefault();
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
            Please input your username and password to login.
            <div>
              Or <a onClick={(e) => this.changeMode(e)} href="#">Create User Account</a>
            </div>
          </div>
        )
      }
    };

    const styles = {};
    styles.loginErrorText = {
      color: 'red',
    };

    return (
      <div>
        {this.props.loading &&
        <Loading
          withOverLay={true}
        />
        }
        <Dialog
          title={dialogTitle()}
          actions={actions()}
          modal={true}
          open={true}
        >
          {this.state.loginErrorText &&
            <p style={styles.loginErrorText}>
              {this.state.loginErrorText}
            </p>
          }

          <div>
            <TextField
              id="username"
              hintText="user name"
              floatingLabelText="user name"
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
            />
          </div>
        </Dialog>
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
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({login}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);