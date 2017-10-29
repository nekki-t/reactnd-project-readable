import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreatores } from 'redux';

/*--- Material UI ---*/
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/*--- Actions ---*/
import { NEW_POST } from '../actions/actionTypes';

/*--- Shared ---*/
import { URL } from '../shared/constants';

/*--- Children ---*/
import Loading from './Loading';

class NewPost extends Component {
  render() {
    return (
      <div>
        {this.props.loading &&
          <Loading
            withOverLay={true}
          />
        }
        <Dialog
          title=""
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
              onChange={(e) => this.textInput(e.target.value)}
              errorText={this.state.errorText}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

NewPost.contextType = {
  router: PropTypes.object.isRequired,
};

export default connect(null, null)(NewPost);