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
/*--- Shared ---*/
import { URL } from '../shared/constants';
import utilities from '../shared/utilities';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: [],
    }
  }

  componentWillMount() {
    this.props.actions.loadPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({posts: Object.assign([], nextProps.posts)})
    }
  }

  render() {
    const styles = {};
    styles.main = {
      width: '70%',
      margin: '15px auto',
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


    return (
      <div style={styles.main}>
        {this.state.posts && this.state.posts.map((post) =>
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
        <FloatingActionButton
          style={styles.openSearchButton}
          href={URL.NEW_POST}
          secondary={true}
        >
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    )
  }
}

Main.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.session.author,
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