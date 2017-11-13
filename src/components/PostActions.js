import React from 'react';
import PropTypes from 'prop-types';
/*--- Material UI ---*/
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';
import { green500, red500, redA700, indigo500 } from 'material-ui/styles/colors';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';

/*--- Styles ---*/
import { postActionsStyles } from '../utils/styles';

const PostActions = ({post, onShow, onBack, onVote, onDelete, onEdit}) => {
  return (
    <div>
      <CardActions style={postActionsStyles.cardActions}>
        <div style={postActionsStyles.cardActionsLeft}>
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
        {onShow &&
        <div style={postActionsStyles.cardActionsRight}>
          <IconButton
            iconStyle={postActionsStyles.commentIconSize}
            style={postActionsStyles.commentIconButtonSize}
            onClick={() => onDelete()}
          >
            <DeleteIcon
              color={redA700}
            />
          </IconButton>
          <RaisedButton
            label="Show"
            primary={true}
            onClick={() => onShow(post.id, post.category)}
          />
        </div>

        }
        {onBack &&
        <div style={postActionsStyles.cardActionsRight}>
          <IconButton
            iconStyle={postActionsStyles.commentIconSize}
            style={postActionsStyles.commentIconButtonSize}
            onClick={() => onDelete()}
          >
            <DeleteIcon
              color={redA700}
            />
          </IconButton>
          <IconButton
            iconStyle={postActionsStyles.commentIconSize}
            style={postActionsStyles.commentIconButtonSize}
            onClick={() => onEdit()}
          >
            <EditIcon
              color={indigo500}
            />
          </IconButton>
          <RaisedButton
            label="Back"
            onClick={() => onBack()}
            style={postActionsStyles.backButton}
          />
        </div>
        }
      </CardActions>
    </div>
  );
};

PostActions.propTypes = {
  post: PropTypes.object.isRequired,
  onShow: PropTypes.func,
  onBack: PropTypes.func,
  onVote: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};

export default PostActions;
