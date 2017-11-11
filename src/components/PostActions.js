import React from 'react';
import PropTypes from 'prop-types';

/*--- Material UI ---*/
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';
import { green500, red500 } from 'material-ui/styles/colors';


const PostActions = ({post, onShow, onBack, onVote }) => {


  const styles = {};

  styles.cardActions = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
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

  return (
    <div>
      <CardActions style={styles.cardActions}>
        <div style={styles.cardActionsLeft}>
          <IconButton onClick={() => onVote(post.id, true)}>
            <ThumbUpIcon
              color={green500}
            />
          </IconButton>
          <div>{post.voteScore}</div>
          <IconButton onClick={() => onVote(post.id, false)}>
            <ThumbDownIcon color={red500}/>
          </IconButton>
        </div>
        <div style={styles.cardActionsRight}>
          {onShow &&
          <RaisedButton
            label="Show"
            primary={true}
            onClick={() => onShow(post.id)}
          />
          }
          {onBack &&
          <RaisedButton
            label="Back"
            onClick={() => onBack()}
          />
          }
        </div>
      </CardActions>
    </div>
  );
};

PostActions.propTypes = {
  post: PropTypes.object.isRequired,
  onShow: PropTypes.func,
  onBack: PropTypes.func,
  onVote: PropTypes.func.isRequired,
};

export default PostActions;
