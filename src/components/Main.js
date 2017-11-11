import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts, voteForPost } from '../actions/postsAction';
/*--- Matrial UI ---*/
import { Card } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import Divider from 'material-ui/Divider';
/*--- Libraries ---*/
import sortBy from 'sort-by';
/*--- Shared ---*/
import { API, URL } from '../shared/constants';
import utilities from '../shared/utilities';
/*--- Children ---*/
import Loading from './Loading';
import PostTitle from './PostTitle';
import PostActions from './PostActions';

const sortTarget = {
  Default: {
    displayName: 'Default (Ranking)',
  },
  PostedAt: {
    displayName: 'Posted at',
    sortName: 'timestamp',
  },
  Title: {
    displayName: 'Title',
    sortName: 'sortTitle',
  },
  Author: {
    displayName: 'Author',
    sortName: 'sortAuthor',
  },
  Category: {
    displayName: 'Category',
    sortName: 'sortCategory',
  },
  CommentCount: {
    displayName: 'Comment Count',
    sortName: 'commentCount'
  },
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
    this.gotoDetails = this.gotoDetails.bind(this);
    this.state = {
      sortMenuOpen: false,
      posts: [],
      orgPosts: [],
      sortBy: sortTarget.Default.displayName,
      sortAsc: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    if (this.props.posts !== nextProps.posts) {
      let nextPosts = nextProps.posts;
      if (this.context.router.route.match.params.category) {
        nextPosts = nextProps.posts.filter(post => post.category === this.context.router.route.match.params.category);
      }
      this.setState({
        posts: Object.assign([], nextPosts),
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

  };

  sortPosts = (org, target, asc) => {
    if (asc) {
      org.sort(sortBy(target));
    } else {
      org.sort(sortBy(`-${target}`));
    }
  };

  sortItemSelectedAgain = (event) => {
    let asc = true;
    const value = event.target.textContent;
    if (value === this.state.sortBy) {
      asc = !this.state.sortAsc;
    } else if (
      value === sortTarget.CommentCount.displayName ||
      value === sortTarget.PostedAt.displayName
    ) {
      asc = false; // it is better to be desc for these as default.
    }

    let sortedPosts = Object.assign([], this.state.posts);
    switch (value) {
      case sortTarget.PostedAt.displayName:
        this.sortPosts(sortedPosts, sortTarget.PostedAt.sortName, asc);
        break;
      case sortTarget.Title.displayName:
        this.sortPosts(sortedPosts, sortTarget.Title.sortName, asc);
        break;
      case sortTarget.Author.displayName:
        this.sortPosts(sortedPosts, sortTarget.Author.sortName, asc);
        break;
      case sortTarget.Category.displayName:
        this.sortPosts(sortedPosts, sortTarget.Category.sortName, asc);
        break;
      case sortTarget.CommentCount.displayName:
        this.sortPosts(sortedPosts, sortTarget.CommentCount.sortName, asc);
        break;
      default:
        sortedPosts = Object.assign([], this.props.posts);
    }

    this.setState({
      sortBy: value,
      sortAsc: asc,
      posts: sortedPosts,
    });
  };

  gotoDetails = (id) => {
    this.context.router.history.push(URL.POST.replace(':id', id));
  };

  getArrow = (value) => {
    if (value === this.state.sortBy) {
      if (this.state.sortAsc) {
        return (
          < ArrowUpward/>
        )

      } else {
        return (
          < ArrowDownward/>
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

    styles.card = {
      marginBottom: 20,
    };

    styles.cardText = {
      padding: 0
    };

    styles.addButton = {
      position: 'absolute',
      right: 25,
      bottom: 25
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
                primaryText={sortTarget.Default.displayName}
                value={sortTarget.Default.displayName}
              />
              <Divider/>
              {Object.keys(sortTarget).map((key) =>
                sortTarget[key].sortName &&
                <MenuItem
                  key={key}
                  primaryText={sortTarget[key].displayName}
                  value={sortTarget[key].displayName}
                  rightIcon={this.getArrow(sortTarget[key].displayName)}
                />
              )}
            </IconMenu>
            <span onClick={this.openSortMenu} style={styles.sortMenuTitle}>
               Sort List
            </span>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
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
                < PostTitle
                  post={post}
                />
                < PostActions
                  post={post}
                  onShow={this.gotoDetails}
                  onVote={this.vote}
                />
              </Card>
            </GridTile>
          )}
        </GridList>

        {this.props.user &&
        <FloatingActionButton
          style={styles.addButton}
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
  const posts = utilities.adjustPostForSortingAndRanking(state.post.posts);
  return {
    user: state.session.user,
    loading: state.post.loading,
    posts: posts,
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadPosts, voteForPost}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);