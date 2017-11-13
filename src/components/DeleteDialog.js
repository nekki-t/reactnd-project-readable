import React from 'react';
import PropTypes from 'prop-types';

/*--- Material UI ---*/
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

/*--- Styles ---*/
import { deleteDialogStyles } from '../utils/styles';

const DeleteDialog = ({open, onCancel, onDelete}) => {
  return (
    <Dialog
      title="Delete this post"
      actions={
        [
          <RaisedButton
            label="Cancel"
            onClick={() => onCancel()}
          />,
          <RaisedButton
            label="Delete"
            secondary={true}
            onClick={() => onDelete()}
            style={deleteDialogStyles.actionButton}
          />,
        ]
      }
      modal={true}
      open={open}
    >
      Are you sure to delete this Post?
    </Dialog>
  )
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteDialog;