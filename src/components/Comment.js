import React from 'react';
import PropTypes from 'prop-types';
/*--- Material UI ---*/
import Dialog from 'material-ui/Dialog';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
/*--- shared ---*/
import { LIMITATION } from '../shared/constants';

const Comment = ({
                   isNew,
                   onCancel,
                   onExecute,
                   onTextChange,
                   comment,
                   author,
                   commentError,
                   authorError,
                   open,
                 }) => {

  const styles = {};

  styles.editArea = {
    backgroundColor: '#f9f9f9'
  };

  styles.actionButton = {
    marginLeft: 20,
  };

  return (
    <Dialog
      title={isNew ? 'Add Comment' : 'Edit Comment'}
      actions={
        [
          <RaisedButton
            label="Cancel"
            onClick={() => onCancel()}
          />,
          <RaisedButton
            label={isNew ? 'Create' : 'Update'}
            secondary={true}
            onClick={() => onExecute()}
            style={styles.actionButton}
          />,
        ]
      }
      modal={true}
      open={open}
    >
      <Card
        style={styles.editArea}
      >
        <CardText
        >
          {isNew &&
          <TextField
            id="author"
            hintText={`input author name within ${LIMITATION.author} characters.`}
            floatingLabelText="Author Name"
            floatingLabelFixed={true}
            fullWidth={true}
            value={author}
            errorText={authorError}
            onChange={(e) => onTextChange(e.target.id, e.target.value)}
          />
          }

          <TextField
            id="commentText"
            hintText={`input comment within ${LIMITATION.comment} characters.`}
            floatingLabelText="Comment"
            floatingLabelFixed={true}
            fullWidth={true}
            value={comment}
            multiLine={true}
            rows={5}
            errorText={commentError}
            onChange={(e) => onTextChange(e.target.id, e.target.value)}
          />
        </CardText>
      </Card>
    </Dialog>
  )
};

Comment.propTypes = {
  isNew: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onExecute: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  commentError: PropTypes.string.isRequired,
  authorError: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Comment;
