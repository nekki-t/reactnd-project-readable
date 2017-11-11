import React from 'react';
import PropTypes from 'prop-types';

/*--- Material UI ---*/
import Avatar from 'material-ui/Avatar';
import { CardTitle } from 'material-ui/Card';
import { red500, yellow500, orange500 } from 'material-ui/styles/colors';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

/*--- Shared ---*/
import utilities from '../shared/utilities';

const PostTitle = ({post}) => {
  const styles = {};

  styles.cardCategory = {
    fontSize: '14pt',
    color: '#51ff3a',
    textShadow: '2px 2px 2px #000',
    height: 20,
    title: {
      fontSize: '1em',
      color: '#baffd6',
      marginRight: 5,
      fontSize: 14,
      fontWeight: 400,
    },
  };

  styles.avatar = {
    fontWeight: '900',
    marginRight: 10,
  };

  styles.postTitle = {
    textShadow: '2px 2px 2px #000',
    fontFamily: "'Acme', sans-serif",
    fontSize: 18,
  };

  styles.cardTitle = {
    display: 'flex',
    fontSize: 18,
  };

  styles.cardHeader = {
    backgroundColor: '#535353',
    color: '#ccc',
    padding: '5px 10px',
    textAlign: 'right'
  };

  styles.subtitle = {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'space-between',
  };

  styles.author = {
    marginLeft: 20
  };

  styles.comments = {
    display: 'flex',
    alignItems: 'center',
    count: {
      marginLeft: 5,
      color: '#fff',
      textShadow: '2px 2px 2px #000',
    }
  };

  styles.postedInfo = {
    display: 'flex',
    textShadow: '2px 2px 2px #000',
    title: {
      color: '#baffd6',
      marginRight: 5,
    },
    text: {
      color: '#fff',
    }
  };

  const subTitle = (post) => (
    <div>
      <div style={styles.subtitle}>
        <div style={styles.comments}>
          <CommentIcon color={orange500}/>
          <div style={styles.comments.count}>{post.commentCount}</div>
        </div>
        <div style={styles.postedInfo}>
          <div>
            <span style={styles.postedInfo.title}>posted at:</span>
            <span style={styles.postedInfo.text}>{utilities.getFormattedDateTime(post.timestamp)}</span>
          </div>
          <div style={styles.author}>
            <span style={styles.postedInfo.title}>by</span>
            <span style={styles.postedInfo.text}>{post.author}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <CardTitle
        title={
          <div>
            <div style={styles.cardCategory}>
              <span style={styles.cardCategory.title}>category: </span>
              {post.category}
            </div>
            <div style={styles.cardTitle}>
              <Avatar
                color={red500}
                backgroundColor={yellow500}
                size={30}
                style={styles.avatar}
              >
                {post.ranking}
              </Avatar>
              <div style={styles.postTitle}>
                {post.title}
              </div>
            </div>
          </div>
        }
        subtitle={subTitle(post)}
        titleColor="#fff"
        subtitleColor="#ccc"
        style={styles.cardHeader}
      />
    </div>
  );
};

PostTitle.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostTitle;