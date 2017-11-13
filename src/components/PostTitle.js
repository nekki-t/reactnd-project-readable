import React from 'react';
import PropTypes from 'prop-types';

/*--- Material UI ---*/
import Avatar from 'material-ui/Avatar';
import { CardTitle } from 'material-ui/Card';
import { red500, yellow500, orange500 } from 'material-ui/styles/colors';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

/*--- Shared ---*/
import utilities from '../shared/utilities';

/*--- styles ---*/
import { postTitleStyles } from '../utils/styles';

const PostTitle = ({post}) => {

  const subTitle = (post) => (
    <div>
      <div style={postTitleStyles.subtitle}>
        <div style={postTitleStyles.comments}>
          <CommentIcon color={orange500}/>
          <div style={postTitleStyles.comments.count}>{post.commentCount}</div>
        </div>
        <div style={postTitleStyles.postedInfo}>
          <div>
            <span style={postTitleStyles.postedInfo.title}>posted at:</span>
            <span style={postTitleStyles.postedInfo.text}>{utilities.getFormattedDateTime(post.timestamp)}</span>
          </div>
          <div style={postTitleStyles.author}>
            <span style={postTitleStyles.postedInfo.title}>by</span>
            <span style={postTitleStyles.postedInfo.text}>{post.author}</span>
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
            <div style={postTitleStyles.cardCategory}>
              <span style={postTitleStyles.cardCategory.title}>category: </span>
              {post.category}
            </div>
            <div style={postTitleStyles.cardTitle}>
              <Avatar
                color={red500}
                backgroundColor={yellow500}
                size={30}
                style={postTitleStyles.avatar}
              >
                {post.ranking}
              </Avatar>
              <div style={postTitleStyles.postTitle}>
                {post.title}
              </div>
            </div>
          </div>
        }
        subtitle={subTitle(post)}
        titleColor="#fff"
        subtitleColor="#ccc"
        style={postTitleStyles.cardHeader}
      />
    </div>
  );
};

PostTitle.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostTitle;