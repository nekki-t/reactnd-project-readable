import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { post, initializePost } from '../actions/postsActions';
/*--- Material UI ---*/
import { Card, CardActions, CardText, CardTitle } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

/*--- Shared ---*/
import { URL, LIMITATION } from '../shared/constants';

/*--- Children ---*/
import Loading from './Loading';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      title: '',
      body: '',
      titleError: '',
      bodyError: '',
      categoryError: '',
    };
    this.categoryChanged = this.categoryChanged.bind(this);
    this.textInput = this.textInput.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.gotoTop = this.gotoTop.bind(this);
    this.newPost = this.newPost.bind(this);
  }

  categoryChanged = (event, index, value) => {
    this.setState({
      category: value,
    });
  };

  textInput = (targetId, value) => {
    this.setState({
      [targetId]: value.trim(),
    })
  };

  submit = () => {
    let submittable = true;

    if (this.state.category === '') {
      this.setState({
        categoryError: 'Please select a category of this post.'
      });
      submittable = false;
    } else {
      this.setState({
        categoryError: ''
      });
    }

    if (this.state.title === '') {
      this.setState({
        titleError: 'Please input the title.'
      });
      submittable = false;
    } else if (this.state.title.length > LIMITATION.title) {
      this.setState({
        titleError: `Please input the title within ${LIMITATION.title} characters.`
      });
      submittable = false;
    } else {
      this.setState({
        titleError: ''
      });
    }

    if (this.state.body === '') {
      this.setState({
        bodyError: 'Please input the body.'
      });
      submittable = false;
    } else if (this.state.body.length > LIMITATION.body) {
      this.setState({
        bodyError: `Please input the body within ${LIMITATION.body} characters.`
      });
      submittable = false;
    } else {
      this.setState({
        bodyError: ''
      });
    }


    if (submittable) {
      // do post
      const post = {};
      post.id = Date.now();
      post.timestamp = Date.now();
      post.category = this.state.category;
      post.title = this.state.title;
      post.body = this.state.body;
      post.author = this.props.user;

      this.props.actions.post(post);
    }
  };

  cancel = () => {
    this.context.router.history.push(URL.ROOT);
  };

  gotoTop = () => {
    this.props.actions.initializePost();
    this.context.router.history.push(URL.ROOT);
  };

  newPost = () => {
    this.props.actions.initializePost();
    this.context.router.history.push(URL.NEW_POST);
  };

  render() {
    const styles = {};
    styles.container = {
      display: 'flex',
      flexDirection: 'column'
    };

    styles.actions = {
      display: 'flex',
      justifyContent: 'flex-end',
    };

    styles.submit = {
      marginLeft: 10
    };

    styles.topPageButton = {
      marginLeft: 10
    };


    const actions = (
      <div>
        <RaisedButton
          label="Cancel"
          onClick={this.cancel}
        />
        <RaisedButton
          style={styles.submit}
          label="Submit"
          primary={true}
          onClick={this.submit}
        />
      </div>
    );

    const dialogActions = (
      <div>
        <RaisedButton
          label="Add another post."
          onClick={this.newPost}
        />
        <RaisedButton
          label="Top page"
          primary={true}
          style={styles.topPageButton}
          onClick={this.gotoTop}
        />
      </div>
    );

    return (
      <div>
        {this.props.loading &&
        <Loading
          withOverLay={true}
        />
        }
        <Card>
          <CardTitle
            title={
              <div>
                New Post
              </div>
            }
          />
          <CardText>
            <div style={styles.container}>
              <SelectField
                floatingLabelText="Category"
                floatingLabelFixed={true}
                hintText="Please select a category"
                value={this.state.category}
                fullWidth={true}
                errorText={this.state.categoryError}
                onChange={this.categoryChanged}
              >
                {this.props.categories &&
                this.props.categories.map((category, index) => (
                  <MenuItem
                    key={index}
                    primaryText={category.name}
                    value={category.name}
                  />
                ))
                }
              </SelectField>
              <TextField
                id="title"
                hintText="input the title within 50 characters."
                floatingLabelText="Title"
                floatingLabelFixed={true}
                fullWidth={true}
                value={this.state.title}
                errorText={this.state.titleError}
                onChange={(e) => this.textInput(e.target.id, e.target.value)}
              />
              <TextField
                id="body"
                hintText="input the body within 500 characters."
                floatingLabelText="Body"
                floatingLabelFixed={true}
                fullWidth={true}
                value={this.state.body}
                multiLine={true}
                rows={10}
                errorText={this.state.bodyError}
                onChange={(e) => this.textInput(e.target.id, e.target.value)}
              />
            </div>

          </CardText>
          <CardActions
            style={styles.actions}
          >
            {actions}
          </CardActions>
        </Card>
        <Dialog
          title="New Post was added."
          actions={dialogActions}
          modal={true}
          open={this.props.created}
        >
          Please check in the list on Top page.
        </Dialog>
      </div>
    )
  }
}

Post.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  loading: state.post.loading,
  created: state.post.created || false,
  user: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({post, initializePost}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);



