import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPost, loadPosts, voteForPost } from '../actions/postsAction';
import { createComment, loadComments, voteForComment, updateComment } from '../actions/commentsAction';
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
/*--- Shared ---*/
import { API, LIMITATION } from '../shared/constants';
import utilities from '../shared/utilities';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Details extends Component {

  constructor() {
    super();
    this.goBack = this.goBack.bind(this);
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

  vote = (id, up) => {
    let updownString = API.vote.upVote;
    if (!up) {
      updownString = API.vote.downVote;
    }
    this.props.actions.voteForPost(id, updownString);
  };

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

  addComment = () => {

    let authorName = this.state.author.trim();
    let newComment = this.state.commentText.trim();

    if (this.validateComment(true, authorName, newComment)) {
      const comment = {};
      comment.id = Date.now();
      comment.timestamp = Date.now();
      comment.parentId = this.props.post.id;
      comment.body = newComment;
      comment.author = authorName;

      this.props.actions.createComment(comment);
      this.closeAddCommentDialog();
    }
  };

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

  updateComment = () => {
    let updateComment = this.state.commentText.trim();

    if (this.validateComment(false, null, updateComment)) {
      const params = {
        timestamp: Date.now(),
        body: updateComment,
      };

      this.props.actions.updateComment(
        this.state.selectedComment.parentId,
        this.state.selectedComment.id,
        params);
      this.closeEditCommentDialog();
    }
  };


  /*--- delete  comment---*/
  deleteComment = (parentId, id) => {

  };

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
    const styles = {};
    styles.text = {
      backgroundColor: '#ffe2ea',
      fontFamily: "'Acme', sans-serif",
      fontSize: 16,
      wordWrap: 'break-word',
    };

    styles.wrapper = {
      display: 'flex',
      flexDirection: 'column'
    };

    styles.commentArea = {
      height: '55vh',
      padding: 3,
      overflowY: 'scroll',
      backgroundColor: '#f6f6f6',
      padding: 10,
    };

    styles.comments = {
      display: 'flex',
      alignItems: 'center',
      count: {
        marginLeft: 5,
      }
    };

    styles.commentsCard = {
      marginTop: 5,
    };

    styles.comment = {
      width: '60%',
      padding: 10,
      marginBottom: 10,
    };

    styles.commentActionArea = {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    };

    styles.commentBody = {
      marginBottom: 10,
      wordWrap: 'break-word',
      fontFamily: "'Acme', sans-serif",
      fontSize: 16,
    };

    styles.commentInfo = {
      fontSize: 12,
      textAlign: 'right',
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 5,
      header: {
        color: '#ff1271',
        marginRight: 5,
      },
      postedAt: {},
      author: {
        marginLeft: 20
      }
    };

    styles.commentVoteActionArea = {
      display: 'flex',
      justifyContent: 'space-between'
    };

    styles.voteArea = {
      display: 'flex',
      alignItems: 'center',
    };

    styles.editArea = {};

    styles.commentIconSize = {
      width: 20,
      height: 20,
    };

    styles.commentIconButtonSize = {
      width: 40,
      height: 40,
      padding: 10,
    };

    styles.commentButtons = {
      width: 50
    };

    styles.actionButton = {
      marginLeft: 20,
    };

    const cardTitle = (
      <div style={styles.comments}>
        <CommentIcon color={orange500}/>
        <div style={styles.comments.count}>Comments</div>
      </div>
    );

    return (
      <div style={styles.wrapper}>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          style={{zIndex: 10000}}
        />
        {this.props.post &&
        <Card>
          <PostTitle
            post={this.props.post}
          />
          <CardText
            style={styles.text}
          >
            {this.props.post && this.props.post.body}
          </CardText>
          <PostActions
            post={this.props.post}
            onBack={this.goBack}
            onVote={this.vote}
          />
        </Card>
        }
        {this.props.comments &&
        <Card
          style={styles.commentsCard}
        >
          <CardHeader
            title={cardTitle}
          />
          <CardText
            style={styles.commentArea}
          >
            {this.props.comments.map((comment, index) =>
              <div key={index} style={this.getCommentLayoutStyle(index)}>
                <Paper style={styles.comment}>
                  <div style={styles.commentBody}>
                    {comment.body}
                  </div>
                  <div style={styles.commentInfo}>
                    <div style={styles.commentInfo.postedAt}>
                      <span style={styles.commentInfo.header}>
                        posted at:
                      </span>
                      {utilities.getFormattedDateTime(comment.timestamp)}
                    </div>
                    <div style={styles.commentInfo.author}>
                      <span style={styles.commentInfo.header}>
                        by
                      </span>
                      {comment.author}
                    </div>
                  </div>
                  <Divider/>
                  <div style={styles.commentVoteActionArea}>
                    <div style={styles.voteArea}>
                      <IconButton
                        iconStyle={styles.commentIconSize}
                        style={styles.commentIconButtonSize}
                        onClick={() => this.voteForComment(comment.parentId, comment.id, true)}
                      >
                        <ThumbUpIcon
                          color={green500}
                        />
                      </IconButton>
                      <div>{comment.voteScore}</div>
                      <IconButton
                        iconStyle={styles.commentIconSize}
                        style={styles.commentIconButtonSize}
                        onClick={() => this.voteForComment(comment.parentId, comment.id, false)}
                      >
                        <ThumbDownIcon color={red500}/>
                      </IconButton>
                    </div>
                    <div style={styles.editArea}>
                      <IconButton
                        iconStyle={styles.commentIconSize}
                        style={styles.commentIconButtonSize}
                        onClick={() => this.openDeleteCommentDialog(comment)}
                      >
                        <DeleteIcon
                          color={redA700}
                        />
                      </IconButton>
                      <IconButton
                        iconStyle={styles.commentIconSize}
                        style={styles.commentIconButtonSize}
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
            style={styles.commentActionArea}
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
                  onClick={() => this.deleteComment(this.state.selectedComment)}
                  style={styles.actionButton}
                />,
              ]
            }
            modal={true}
            open={this.state.deleteCommentDialogOpen}
          >
            Are you sure to delete this comment?
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
      loadComments,
      voteForComment,
      createComment,
      updateComment,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Details)