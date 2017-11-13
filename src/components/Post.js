import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { post, loadPost, updatePost } from '../actions/postsAction';
/*--- Material UI ---*/
import { Card, CardActions, CardText, CardTitle } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
/*--- Shared ---*/
import { LIMITATION, URL, MESSAGE } from '../shared/constants';

/*--- Styles ---*/
import { postStyles } from '../utils/styles';

/*--- Modules ---*/
import { toast, ToastContainer } from 'react-toastify';
import shortId from 'shortid';

/*--- Children ---*/
import Loading from './Loading';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      postId: null,
      isEdit: false,
      author: '',
      category: '',
      title: '',
      body: '',
      authorError: '',
      titleError: '',
      bodyError: '',
      categoryError: '',
      openDoneDialog: false,
    };
    this.categoryChanged = this.categoryChanged.bind(this);
    this.textInput = this.textInput.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.gotoTop = this.gotoTop.bind(this);
    this.newPost = this.newPost.bind(this);
    this.goBackToDetails = this.goBackToDetails.bind(this);
  }

  componentDidMount() {
    let postId = this.context.router.route.match.params.id;
    if (postId) {
      this.setState({
        postId,
        isEdit: true,
      });
      this.props.actions.loadPost(postId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orgPost &&
      this.props.orgPost !== nextProps.orgPost &&
      nextProps.orgPost.hasOwnProperty('id')) {
      this.setState({
        author: nextProps.orgPost.author,
        category: nextProps.orgPost.category,
        title: nextProps.orgPost.title,
        body: nextProps.orgPost.body,
      })
    }
  }

  categoryChanged = (event, index, value) => {
    this.setState({
      category: value,
    });
  };

  textInput = (targetId, value) => {
    this.setState({
      [targetId]: value,
    })
  };

  validate = () => {

    let submittable = true;

    if (this.state.author === '') {
      this.setState({
        authorError: 'Please input author.'
      });
      submittable = false;
    } else if (this.state.author.length > LIMITATION.author) {
      this.setState({
        authorError: `Please input author within ${LIMITATION.author} characters.`
      });
      submittable = false;
    } else {
      this.setState({
        authorError: ''
      })
    }

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
        titleError: 'Please input title.'
      });
      submittable = false;
    } else if (this.state.title.length > LIMITATION.title) {
      this.setState({
        titleError: `Please input title within ${LIMITATION.title} characters.`
      });
      submittable = false;
    } else {
      this.setState({
        titleError: ''
      });
    }

    if (this.state.body === '') {
      this.setState({
        bodyError: 'Please input body.'
      });
      submittable = false;
    } else if (this.state.body.length > LIMITATION.body) {
      this.setState({
        bodyError: `Please input body within ${LIMITATION.body} characters.`
      });
      submittable = false;
    } else {
      this.setState({
        bodyError: ''
      });
    }

    if (this.state.isEdit) {
      if (this.props.orgPost.title === this.state.title &&
        this.props.orgPost.body === this.state.body) {
        this.setState({
          titleError: 'Nothing has been changed.',
          bodyError: 'Nothing has been changed.',
        });
        submittable = false;
      }
    }

    return submittable
  };

  async submit() {
    if (!this.validate()) {
      return;
    }
    const post = {};
    if (this.state.isEdit) {
      const params = {
        title: this.state.title,
        body: this.state.body,
      };

      try {
        await this.props.actions.updatePost(this.props.orgPost.id, params);
        this.setState({
          openDoneDialog: true
        });
      } catch (error) {
        toast(MESSAGE.AJAX_ERROR, {
          type: toast.TYPE.ERROR,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      post.id = shortId.generate();
      post.timestamp = Date.now();
      post.category = this.state.category;
      post.title = this.state.title;
      post.body = this.state.body;
      post.author = this.state.author;

      try {
        await this.props.actions.post(post);
        this.setState({
          openDoneDialog: true
        });
      } catch (error) {
        toast(MESSAGE.AJAX_ERROR, {
          type: toast.TYPE.ERROR,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }

  cancel = () => {
    this.context.router.history.goBack();
  };

  goBackToDetails = () => {
    this.context.router.history.goBack();
  };

  gotoTop = () => {
    this.context.router.history.push(URL.ROOT);
  };

  newPost = () => {
    this.context.router.history.push(URL.NEW_POST);
  };

  render() {

    const actions = (
      <div>
        <RaisedButton
          label="Cancel"
          onClick={this.cancel}
        />
        <RaisedButton
          style={postStyles.submit}
          label={this.state.isEdit ? 'Update' : 'Create'}
          primary={true}
          onClick={this.submit}
        />
      </div>
    );

    const dialogActions = () => {
      if (this.state.isEdit) {
        return (
          <RaisedButton
            label="Back to Details"
            onClick={this.goBackToDetails}
          />)
      }
      else {
        return (<div>
          <RaisedButton
            label="Add another post."
            onClick={this.newPost}
          />
          <RaisedButton
            label="Top page"
            primary={true}
            style={postStyles.topPageButton}
            onClick={this.gotoTop}
          />
        </div>)
      }
    };

    return (
      <div>
        {this.props.loading &&
        <Loading
          withOverLay={true}
        />
        }
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          style={{zIndex: 10000}}
        />
        <Card>
          <CardTitle
            title={
              <div>
                {this.state.isEdit ? 'Update Post' : 'New Post'}
              </div>
            }
          />
          <CardText>
            <div style={postStyles.container}>
              <TextField
                id="author"
                hintText={`input author name within ${LIMITATION.author} characters.`}
                floatingLabelText="Author Name"
                floatingLabelFixed={true}
                fullWidth={true}
                value={this.state.author}
                errorText={this.state.authorError}
                onChange={(e) => this.textInput(e.target.id, e.target.value)}
                disabled={this.state.isEdit}
              />
              <SelectField
                floatingLabelText="Category"
                floatingLabelFixed={true}
                hintText="Please select a category"
                value={this.state.category}
                fullWidth={true}
                errorText={this.state.categoryError}
                onChange={this.categoryChanged}
                disabled={this.state.isEdit}
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
                hintText={`input the title within ${LIMITATION.title} characters.`}
                floatingLabelText="Title"
                floatingLabelFixed={true}
                fullWidth={true}
                value={this.state.title}
                errorText={this.state.titleError}
                onChange={(e) => this.textInput(e.target.id, e.target.value)}
              />
              <TextField
                id="body"
                hintText={`input the body within ${LIMITATION.body} characters.`}
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
            style={postStyles.actions}
          >
            {actions}
          </CardActions>
        </Card>
        <Dialog
          title={this.state.isEdit ? "The post has been updated!" : "New Post has been added."}
          actions={dialogActions()}
          modal={true}
          open={this.state.openDoneDialog}
        >
          {this.state.isEdit &&
          <p>
            Please check in Details view.
          </p>
          }
          {!this.state.isEdit &&
          <p>
            Please check in the list on Top page.
          </p>
          }
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
  user: state.session.user,
  orgPost: state.post.post,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({post, loadPost, updatePost}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);



