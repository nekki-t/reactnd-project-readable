import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPost, loadPosts, voteForPost, deletePost } from '../actions/postsAction';
import {
  createComment,
  loadComments,
  updateComment,
  voteForComment,
  deleteComment,
} from '../actions/commentsAction';
/*--- Material UI ---*/
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import { green500, indigo500, orange500, red500, redA700 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import Dialog from 'material-ui/Dialog';
/*--- Children ---*/
import PostTitle from './PostTitle';
import PostActions from './PostActions';
import Comment from './Comment';
import DeleteDialog from './DeleteDialog';
/*--- Shared ---*/
import { API, LIMITATION, URL, MESSAGE } from '../shared/constants';
import utilities from '../shared/utilities';

/*--- styles ---*/
import { detailsStyles } from '../utils/styles';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Details extends Component {

  constructor() {
    super();
    this.goBack = this.goBack.bind(this);
    this.gotoEditPost = this.gotoEditPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.openDeletePostDialog = this.openDeletePostDialog.bind(this);
    this.closeDeletePostDialog = this.closeDeletePostDialog.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.openAddCommentDialog = this.openAddCommentDialog.bind(this);
    this.openDeleteCommentDialog = this.openDeleteCommentDialog.bind(this);
    this.closeAddCommentDialog = this.closeAddCommentDialog.bind(this);
    this.openEditCommentDialog = this.openEditCommentDialog.bind(this);
    this.closeEditCommentDialog = this.closeEditCommentDialog.bind(this);
    this.closeDeleteCommentDialog = this.closeDeleteCommentDialog.bind(this);
    this.textInput = this.textInput.bind(this);
    this.addComment = this.addComment.bind(this);
    this.updateComment = this.updateComment.bind(this);

    this.state = {
      comments: '',
      commentsShown: false,
      deletePostDialogOpen: false,
      addCommentDialogOpen: false,
      editCommentDialogOpen: false,
      deleteCommentDialogOpen: false,
      selectedComment: null,
      commentText: '',
      commentError: '',
      author: '',
      authorError: '',
    }
  }

  componentDidMount() {
    this.props.actions.loadPosts();
    this.props.actions.loadPost(this.context.router.route.match.params.id);
    this.props.actions.loadComments(this.context.router.route.match.params.id);
  }

  goBack = () => {
    this.context.router.history.goBack();
  };

  /* === < POST > =================================================================== */

  vote = (id, up) => {
    let updownString = API.vote.upVote;
    if (!up) {
      updownString = API.vote.downVote;
    }
    this.props.actions.voteForPost(id, updownString);
  };

  gotoEditPost = () => {
    this.context.router.history.push(URL.POST_EDIT.replace(':id', this.props.post.id));

  };

  closeDeletePostDialog = () => {
    this.setState({
      deletePostDialogOpen: false
    })
  };

  openDeletePostDialog = () => {
    this.setState({
      deletePostDialogOpen: true
    });
  };

  async deletePost() {
    try {
      await this.props.actions.deletePost(this.props.post.id);
      this.context.router.history.goBack();
    } catch (error) {
      toast(MESSAGE.AJAX_ERROR, {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  /* === < Comments > =================================================================== */
  voteForComment = (parentId, id, up) => {
    let updownString = API.vote.upVote;
    if (!up) {
      updownString = API.vote.downVote;
    }
    this.props.actions.voteForComment(parentId, id, updownString);
  };

  getCommentLayoutStyle = (index) => {
    if (!(index % 2 === 0)) {
      return {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    } else {
      return {
        display: 'flex',
        justifyContent: 'flex-start'
      }
    }
  };

  /*--- add comment ---*/
  openAddCommentDialog = () => {
    this.setState({
      addCommentDialogOpen: true
    });
  };

  closeAddCommentDialog = () => {
    this.setState({
      commentText: '',
      commentError: '',
      author: '',
      authorError: '',
      addCommentDialogOpen: false
    });
  };

  textInput = (targetId, value) => {
    this.setState({
      [targetId]: value
    });
  };

  validateComment = (isNew, author, comment) => {
    let submittable = true;

    if (isNew) {
      if (author === '') {
        this.setState({
          authorError: 'Please input author name.'
        });
        submittable = false;
      } else if (author.length > LIMITATION.author) {
        this.setState({
          authorError: `Please input author name within ${LIMITATION.author} characters`
        });
        submittable = false;
      }
    } else {
      if (this.state.selectedComment.body === comment) {
        this.setState({
          commentError: 'Nothing has been changed.'
        });
        submittable = false;
      }
    }

    if (comment === '') {
      this.setState({
        commentError: 'Please input comment.'
      });
      submittable = false;
    } else if (comment.length > LIMITATION.comment) {
      this.setState({
        commentError: `Please input comment within ${LIMITATION.comment} characters.`
      });
      submittable = false;
    }

    return submittable;
  };

  async addComment() {

    let authorName = this.state.author.trim();
    let newComment = this.state.commentText.trim();

    if (this.validateComment(true, authorName, newComment)) {
      const comment = {};
      comment.id = Math.random().toString(36);
      comment.timestamp = Date.now();
      comment.parentId = this.props.post.id;
      comment.body = newComment;
      comment.author = authorName;

      try {
        await this.props.actions.createComment(comment);
        toast('Comment has been created!', {
          type: toast.TYPE.SUCCESS,
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast(MESSAGE.AJAX_ERROR, {
          type: toast.TYPE.ERROR,
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        this.closeAddCommentDialog();
      }
    }
  }

  /*--- edit comment ---*/
  openEditCommentDialog = (comment) => {
    this.setState({
      selectedComment: comment,
      commentText: comment.body,
      author: comment.author,
      editCommentDialogOpen: true,
    });
  };

  closeEditCommentDialog = () => {
    this.setState({
      commentText: '',
      commentError: '',
      author: '',
      authorError: '',
      editCommentDialogOpen: false
    });
  };

  async updateComment() {
    let updateComment = this.state.commentText.trim();

    if (this.validateComment(false, null, updateComment)) {
      const params = {
        timestamp: Date.now(),
        body: updateComment,
      };

      try {
        await this.props.actions.updateComment(
          this.state.selectedComment.parentId,
          this.state.selectedComment.id,
          params);
        toast('Comment has been updated!', {
          type: toast.TYPE.SUCCESS,
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast(MESSAGE.AJAX_ERROR, {
          type: toast.TYPE.ERROR,
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        this.closeEditCommentDialog();
      }
    }
  }

  /*--- delete  comment---*/
  async deleteComment() {
    try {
      await this.props.actions.deleteComment(
        this.state.selectedComment.parentId,
        this.state.selectedComment.id
      );
      toast('Comment has been deleted!', {
        type: toast.TYPE.SUCCESS,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast(MESSAGE.AJAX_ERROR, {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      this.closeDeleteCommentDialog();
    }
  }

  openDeleteCommentDialog = (comment) => {
    this.setState({
      selectedComment: comment,
      deleteCommentDialogOpen: true,
    });
  };

  closeDeleteCommentDialog = () => {
    this.setState({
      selectedComment: null,
      deleteCommentDialogOpen: false,
    })
  };

  render() {

    const cardTitle = (
      <div style={detailsStyles.comments}>
        <CommentIcon color={orange500}/>
        <div style={detailsStyles.comments.count}>Comments</div>
      </div>
    );

    return (
      <div style={detailsStyles.wrapper}>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          style={{zIndex: 10000}}
        />
        {!this.props.loading && this.props.post && !this.props.post.hasOwnProperty('id') &&
          <Card>
            <CardText>
              <h3>
                The post for this url does not exist or has already been deleted.
              </h3>
            </CardText>
            <CardActions style={detailsStyles.noDataActionArea}>
              <RaisedButton
                label="Top Page"
                primary={true}
                onClick={() => this.context.router.history.push(URL.ROOT)}
              />
            </CardActions>
          </Card>
        }
        {this.props.post && this.props.post.hasOwnProperty('id') &&
        <Card>
          <PostTitle
            post={this.props.post}
          />
          <CardText
            style={detailsStyles.text}
          >
            {this.props.post && this.props.post.body &&
            <p dangerouslySetInnerHTML={{__html: this.props.post.body.replace(/\n/g, '</br>')}}/>
            }
          </CardText>
          <PostActions
            post={this.props.post}
            onBack={this.goBack}
            onVote={this.vote}
            onEdit={this.gotoEditPost}
            onDelete={this.openDeletePostDialog}
          />
        </Card>
        }
        {this.props.post && this.props.post.hasOwnProperty('id') && this.props.comments &&
        <Card
          style={detailsStyles.commentsCard}
        >
          <CardHeader
            title={cardTitle}
          />
          <CardText
            style={detailsStyles.commentArea}
          >
            {this.props.comments.map((comment, index) =>
              <div key={index} style={this.getCommentLayoutStyle(index)}>
                <Paper style={detailsStyles.comment}>
                  <div style={detailsStyles.commentBody}>
                    {comment.body}
                  </div>
                  <div style={detailsStyles.commentInfo}>
                    <div style={detailsStyles.commentInfo.postedAt}>
                      <span style={detailsStyles.commentInfo.header}>
                        posted at:
                      </span>
                      {utilities.getFormattedDateTime(comment.timestamp)}
                    </div>
                    <div style={detailsStyles.commentInfo.author}>
                      <span style={detailsStyles.commentInfo.header}>
                        by
                      </span>
                      {comment.author}
                    </div>
                  </div>
                  <Divider/>
                  <div style={detailsStyles.commentVoteActionArea}>
                    <div style={detailsStyles.voteArea}>
                      <IconButton
                        iconStyle={detailsStyles.commentIconSize}
                        style={detailsStyles.commentIconButtonSize}
                        onClick={() => this.voteForComment(comment.parentId, comment.id, true)}
                      >
                        <ThumbUpIcon
                          color={green500}
                        />
                      </IconButton>
                      <div>{comment.voteScore}</div>
                      <IconButton
                        iconStyle={detailsStyles.commentIconSize}
                        style={detailsStyles.commentIconButtonSize}
                        onClick={() => this.voteForComment(comment.parentId, comment.id, false)}
                      >
                        <ThumbDownIcon color={red500}/>
                      </IconButton>
                    </div>
                    <div style={detailsStyles.editArea}>
                      <IconButton
                        iconStyle={detailsStyles.commentIconSize}
                        style={detailsStyles.commentIconButtonSize}
                        onClick={() => this.openDeleteCommentDialog(comment)}
                      >
                        <DeleteIcon
                          color={redA700}
                        />
                      </IconButton>
                      <IconButton
                        iconStyle={detailsStyles.commentIconSize}
                        style={detailsStyles.commentIconButtonSize}
                        onClick={() => this.openEditCommentDialog(comment)}
                      >
                        <EditIcon
                          color={indigo500}
                        />
                      </IconButton>
                    </div>
                  </div>
                </Paper>
              </div>
            )}
          </CardText>
          <CardActions
            style={detailsStyles.commentActionArea}
          >
            <RaisedButton
              label="Add Comment"
              secondary={true}
              onClick={() => this.openAddCommentDialog()}
            />
          </CardActions>
        </Card>
        }

        <div>

          <DeleteDialog
            open={this.state.deletePostDialogOpen}
            onCancel={this.closeDeletePostDialog}
            onDelete={this.deletePost}
          />

          <Dialog
            title="Delete this comment"
            actions={
              [
                <RaisedButton
                  label="Cancel"
                  onClick={() => this.closeDeleteCommentDialog()}
                />,
                <RaisedButton
                  label="Delete"
                  secondary={true}
                  onClick={() => this.deleteComment()}
                  style={detailsStyles.actionButton}
                />,
              ]
            }
            modal={true}
            open={this.state.deleteCommentDialogOpen}
          >
            Are you sure to delete this comment?

            {this.state.selectedComment &&
            <Card style={detailsStyles.confirmDeleteCommentCard}>
              <CardText>
                <h3>author: {this.state.selectedComment.author}</h3>
                {this.state.selectedComment.body}
              </CardText>
            </Card>
            }
          </Dialog>
        </div>

        <div>
          <Comment
            isNew={true}
            onCancel={this.closeAddCommentDialog}
            onExecute={this.addComment}
            onTextChange={this.textInput}
            comment={this.state.commentText}
            author={this.state.author}
            commentError={this.state.commentError}
            authorError={this.state.authorError}
            open={this.state.addCommentDialogOpen}
          />
          <Comment
            isNew={false}
            onCancel={this.closeEditCommentDialog}
            onExecute={this.updateComment}
            onTextChange={this.textInput}
            comment={this.state.commentText}
            author={this.state.author}
            commentError={this.state.commentError}
            authorError={this.state.authorError}
            open={this.state.editCommentDialogOpen}
          />
        </div>
      </div>
    );
  }
}

Details.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const posts = utilities.adjustPostForSortingAndRanking(state.post.posts);
  let currentPost = state.post.post;
  if (posts.length > 0 && currentPost) {
    let target = posts.find((p) => {
      return p.id === currentPost.id;
    });
    if (target) {
      currentPost.ranking = target.ranking;
    }
  }
  const comments = utilities.sortCommentsByRanking(state.comment.comments);
  return {
    user: state.session.user,
    loading: state.post.loading,
    post: currentPost,
    posts: posts,
    comments: comments,
    commentCreated: state.comment.commentCreated,
  }
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadPost,
      loadPosts,
      voteForPost,
      deletePost,
      loadComments,
      voteForComment,
      createComment,
      updateComment,
      deleteComment,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Details)