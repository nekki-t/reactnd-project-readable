import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import { loadingStyles } from '../utils/styles';


const Loading = ({withOverLay}) => {
   let tag = (
    <div style={loadingStyles.circlularArea}>
      <CircularProgress size={100}/>
    </div>
  );

  if (withOverLay) {
    tag = (
      <div style={loadingStyles.onProgress}>
        {tag}
      </div>
    )
  }

  return (
    tag
  );
};

Loading.propTypes = {
  withOverLay: PropTypes.bool.isRequired,
};

export default Loading;