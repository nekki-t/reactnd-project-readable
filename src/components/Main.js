import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts, postsLoaded, voteForPost } from '../actions/postsActions';
/*--- Matrial UI ---*/
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { green500, orange500, red500, yellow500 } from 'material-ui/styles/colors';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
/*--- Libraries ---*/
/*--- Shared ---*/
import { API, URL } from '../shared/constants';
import utilities from '../shared/utilities';
/*--- Children ---*/
import Loading from './Loading';


const sortTarget = {
  Default: 'Default (Ranking)',
  PostedAt: 'Posted at',
  Title: 'Title',
  Author: 'Author',
  Category: 'Category',
  ClearSort: 'Clear Sort',
};

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.gotoPost = this.gotoPost.bind(this);
    this.vote = this.vote.bind(this);
    this.openSortMenu = this.openSortMenu.bind(this);
    this.onSortMenuRequestChange = this.onSortMenuRequestChange.bind(this);
    this.sortChanged = this.sortChanged.bind(this);
    this.getArrow = this.getArrow.bind(this);
    this.sortItemSelectedAgain = this.sortItemSelectedAgain.bind(this);
    this.state = {
      sortMenuOpen: false,
      posts: [],
      orgPosts: [],
      sortBy: sortTarget.Default,
      sortAsc: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    if (this.props.posts !== nextProps.posts) {
      console.log(nextProps.posts);
      this.setState({
        posts: Object.assign([], nextProps.posts),
        orgPosts: Object.assign([], nextProps.posts),
      })
    }
  }

  componentDidMount() {
    this.props.actions.loadPosts();
  }

  gotoPost = () => {
    this.context.router.history.push(URL.NEW_POST);
  };

  vote = (id, up) => {
    let updownString = API.vote.upVote;
    if (!up) {
      updownString = API.vote.downVote;
    }
    this.props.actions.voteForPost(id, updownString);
  };

  openSortMenu = () => {
    this.setState({
      sortMenuOpen: true,
    });
  };

  onSortMenuRequestChange = (value) => {
    this.setState({
      sortMenuOpen: value,
    });
  };

  sortChanged = (event, value) => {
    let asc = true;
    if (value === this.state.sortBy) {
      asc = !this.state.sortAsc;
    }

    this.setState({
      sortBy: value,
      sortAsc: asc,
    });
  };

  sortItemSelectedAgain = (event, value) => {
    console.log(event, value);

  };

  getArrow = (value) => {
    if (value === this.state.sortBy) {
      if (this.state.sortAsc) {
        return (
          < ArrowUpward />
        )

      } else {
        return (
          < ArrowDownward />
        )
      }
    } else {
      return (
        <div></div>
      )
    }
  };

  render() {
    const styles = {};

    styles.toolbar = {
      marginBottom: 20,
    };

    styles.toolbarTitle = {
      marginLeft: 0,
    };

    styles.sortMenuTitle = {
      cursor: 'pointer',
    };

    styles.gridList = {
      height: '80vh',
      overflowY: 'auto',
      alignContent: 'flex-start'
    };

    styles.avatar = {
      fontWeight: '900',
      marginRight: 10,
    };

    styles.card = {
      marginBottom: 20,
    };

    styles.cardTitle = {
      display: 'flex',
      fontSize: 18,
    };

    styles.cardHeader = {
      backgroundColor: '#535353',
      color: '#ccc',
    };

    styles.cardText = {
      padding: 0
    };

    styles.cardActions = {
      display: 'flex',
      justifyContent: 'space-between',
    };

    styles.cardActionsLeft = {
      display: 'flex',
      alignItems: 'center',
    };

    styles.cardActionsRight = {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    };

    styles.commentIcon = {
      marginLeft: 20,
    };

    styles.chipsWrapper = {
      display: 'flex',
      flexDirection: 'row-reverse',
      width: '100%',
      backgroundColor: '#535353',
      padding: 3,
    };

    styles.openSearchButton = {
      position: 'absolute',
      right: 25,
      bottom: 25
    };

    styles.postBody = {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    };

    styles.subtitle = {
      marginTop: 5,
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    };

    styles.author = {
      marginLeft: 0
    };

    const toolBar = (
      this.props.user &&
      <Paper>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <SearchIcon style={{marginLeft: 10}}/>
            <TextField
              id="text-field-default"
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator/>
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <SortIcon/>
                </IconButton>
              }
              value={this.state.sortBy}
              open={this.state.sortMenuOpen}
              onChange={this.sortChanged}
              onRequestChange={this.onSortMenuRequestChange}
              onItemTouchTap={this.sortItemSelectedAgain}
            >
              <MenuItem
                primaryText={sortTarget.Default}
                value={sortTarget.Default}
              />
              <Divider/>
              <MenuItem
                primaryText={sortTarget.PostedAt}
                value={sortTarget.PostedAt}
                rightIcon={this.getArrow(sortTarget.PostedAt)}
              />
              <MenuItem
                primaryText={sortTarget.Title}
                value={sortTarget.Title}
                rightIcon={this.getArrow(sortTarget.Title)}
              />
              <MenuItem
                primaryText={sortTarget.Author}
                value={sortTarget.Author}
                rightIcon={this.getArrow(sortTarget.Author)}
              />
              <MenuItem
                primaryText={sortTarget.Category}
                value={sortTarget.Category}
                rightIcon={this.getArrow(sortTarget.Category)}
              />
            </IconMenu>
            <span onClick={this.openSortMenu} style={styles.sortMenuTitle}>
               Sort List
            </span>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
    const subTitle = (post) => (
      <div style={styles.subtitle}>
        <div style={styles.author}>
          author: {post.author}
        </div>
        <div>
          posted at: {utilities.getFormattedDateTime(post.timestamp)}
        </div>
      </div>
    );

    return (
      <div>
        {(this.props.loading) &&
        <Loading
          withOverLay={true}
        />
        }
        <div style={styles.toolbar}>
          {toolBar}
        </div>

        <GridList
          cols={1}
          cellHeight={150}
          padding={10}
          style={styles.gridList}
        >
          {this.props.user && this.state.posts && this.state.posts.map((post) =>
            <GridTile
              key={post.id}
            >
              <Card
                style={styles.card}
              >
                <CardTitle
                  title={
                    <div style={styles.cardTitle}>
                      <Avatar
                        color={red500}
                        backgroundColor={yellow500}
                        size={30}
                        style={styles.avatar}
                      >
                        {post.ranking}
                      </Avatar>
                      <div>
                        {post.title}
                      </div>
                    </div>
                  }
                  subtitle={subTitle(post)}
                  titleColor="#fff"
                  subtitleColor="#ccc"
                  style={styles.cardHeader}
                />
                <CardActions style={styles.cardActions}>
                  <div style={styles.cardActionsLeft}>
                    <IconButton onClick={() => this.vote(post.id, true)}>
                      <ThumbUpIcon
                        color={green500}
                      />
                    </IconButton>
                    <div>{post.voteScore}</div>
                    <IconButton onClick={() => this.vote(post.id, false)}>
                      <ThumbDownIcon color={red500}/>
                    </IconButton>
                    <IconButton
                      style={styles.commentIcon}
                    >
                      <CommentIcon color={orange500}/>
                    </IconButton>
                    <div>{post.commentCount}</div>
                  </div>
                  <div style={styles.cardActionsRight}>
                    <RaisedButton
                      label="Show"
                      primary={true}
                    />
                  </div>
                </CardActions>
              </Card>
            </GridTile>
          )}
        </GridList>

        {this.props.user &&
        <FloatingActionButton
          style={styles.openSearchButton}
          secondary={true}
          onClick={this.gotoPost}
        >
          <ContentAdd/>
        </FloatingActionButton>
        }
      </div>
    );
  }
}

Main.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  let posts = [];
  if (state.post.posts && state.post.posts.length > 0) {
    posts = state.post.posts;
    posts.sort((a, b) => {
      if (a.voteScore > b.voteScore) {
        return -1;
      } else if (a.voteScore < b.voteScore) {
        return 1;
      } else {
        return 0;
      }
    });
    posts.map((post, index) => {
      post.ranking = index + 1;
      post.subTitle = post.title.toLowerCase();
    });
  }
  return {
    user: state.session.user,
    loading: state.post.loading,
    posts: posts,
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadPosts, postsLoaded, voteForPost}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);