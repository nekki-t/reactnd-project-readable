import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts, postsLoaded } from '../actions/postsActions';
/*--- Matrial UI ---*/
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SearchIcon from 'material-ui/svg-icons/action/search';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { red500, yellow500 } from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
/*--- Libraries ---*/
import sortBy from 'sort-by';
/*--- Shared ---*/
import { URL, POST_ATTR } from '../shared/constants';
import utilities from '../shared/utilities';
/*--- Children ---*/
import Loading from './Loading';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.gotoPost = this.gotoPost.bind(this);
    this.state = {
      posts: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    if (this.props.posts !== nextProps.posts) {
      console.log(nextProps.posts);
      this.setState({posts: Object.assign([], nextProps.posts)})
    }
  }

  componentDidMount() {
    this.props.actions.loadPosts();
  }

  gotoPost = () => {
    this.context.router.history.push(URL.NEW_POST);
  };

  render() {
    const styles = {};

    styles.toolbar = {
      marginBottom: 20,
    };

    styles.toolbarTitle = {
      marginLeft: 0,
    };

    styles.chipStyle = {
      ...styles.chip,
      marginRight: 20,
    };

    styles.gridList = {
      height: '80vh',
      overflowY: 'auto',
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
                <IconButton touch={true}>
                  <SortIcon/>
                </IconButton>
              }
            >
              <MenuItem primaryText="Download"/>
              <MenuItem primaryText="More Info"/>
            </IconMenu>
            <span>
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
          cellHeight={250}
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
                        A
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

                <CardActions>
                  <Badge
                    badgeContent={4}
                    primary={true}
                    badgeStyle={{top: 12, right: 12}}
                  >
                    <IconButton tooltip="Vote">
                      <ThumbUpIcon/>
                    </IconButton>
                  </Badge>
                  <Chip
                    style={styles.chipStyle}
                  >
                    {post.category}
                  </Chip>
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
    posts = state.post.posts.map((post) => {
      post.subTitle = post.title.toLowerCase();
    });
    posts = state.post.posts.sort(sortBy('subTitle'));
  }
  return {
    user: state.session.user,
    loading: state.post.loading,
    posts: posts,
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadPosts, postsLoaded}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);