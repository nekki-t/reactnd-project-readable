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

class Login extends Component {

  constructor() {
    super();
    this.authorNameInput = this.authorNameInput.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      authorName: '',
    }
  }

  authorNameInput (value) {
    this.setState({
      authorName: value,
    });
  }

  login() {
    this.props.actions.login(this.state.authorName);
  }

  render() {

    const actions = [
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={this.login}
      />,
    ];

    return (
      <Dialog
        title="Please input the author name that you would like to use."
        actions={actions}
        modal={true}
        open={true}
      >
        <div>
          <TextField
            hintText="Author Name"
            floatingLabelText="Author Name"
            fullWidth={true}
            value={this.state.authorName}
            onChange={(e) => this.authorNameInput(e.target.value)}
          />
        </div>
      </Dialog>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.session.loading,
  author: state.session.author,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({login}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);