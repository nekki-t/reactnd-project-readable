import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts, postsLoaded } from '../actions/postsActions';
/*--- Matrial UI ---*/
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SearchIcon from 'material-ui/svg-icons/action/search';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/*--- Shared ---*/
import { URL } from '../shared/constants';
import utilities from '../shared/utilities';
/*--- Children ---*/
import Loading from './Loading';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
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

  render() {
    const styles = {};
    styles.main = {
      width: '70%',
      margin: '15px auto',
    };

    styles.toolbar = {
      marginBottom: 20,
    };

    styles.toolbarTitle = {
      marginLeft: 0,
    };

    styles.card = {
      marginBottom: 20,
    };

    styles.cardHeader = {
      backgroundColor: '#535353',
      color: '#ccc',
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

    const toolBar = (
      this.props.user &&
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
          <SearchIcon style={{marginLeft: 10}}/>
          <TextField
            id="text-field-default"
          />

        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <SortIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
          <span>
              Sort List
            </span>

        </ToolbarGroup>
      </Toolbar>
    );

    return (
      <div style={styles.main}>
        {(this.props.loading) &&
        <Loading
          withOverLay={true}
        />
        }
        {toolBar}
        {this.props.user && this.state.posts && this.state.posts.map((post) =>
          <Card
            key={post.id}
            style={styles.card}
          >
            <div style={styles.chipsWrapper}>
              <Chip
                style={styles.chip}
              >
                {post.category}
              </Chip>
            </div>
            <CardTitle
              title={post.title}
              subtitle={`author: ${post.author} posted at: ${utilities.getFormattedDateTime(post.timestamp)}`}
              titleColor="#fff"
              subtitleColor="#ccc"
              style={styles.cardHeader}
            />
            <CardText>
              {post.body}
            </CardText>
            <CardActions>
            </CardActions>
          </Card>
        )}
        {this.props.user &&
        <FloatingActionButton
          style={styles.openSearchButton}
          href={URL.NEW_POST}
          secondary={true}
        >
          <ContentAdd/>
        </FloatingActionButton>
        }
      </div>
    )
  }
}

Main.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.session.user,
  loading: state.post.loading,
  posts: state.post.posts,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadPosts, postsLoaded}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);