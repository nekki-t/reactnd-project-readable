import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*--- Material UI ---*/
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ForumIcon from 'material-ui/svg-icons/communication/forum';

/*--- Redux ---*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCategories, categoriesLoaded } from '../actions/categoriesAction';


class SideBar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.actions.loadCategories();
  }

  render () {
    const styles = {};
    styles.drawer = {
      backgroundColor: 'rgba(24, 26, 27, 0.5)',
      appBar: {
        backgroundColor: '#FF4081',
      },
      menuItem: {
        color: '#51ff3a',
      },
    };
    return (
      <Drawer
        docked={false}
        open={this.props.opened}
        onRequestChange={this.props.requestChange}
        containerStyle={styles.drawer}
      >
        <AppBar
          title="Categories"
          style={styles.drawer.appBar}
          iconElementLeft={
            <IconButton><ForumIcon/></IconButton>
          }
        />
        {this.props.categories && this.props.categories.map((cat, index) =>
          <MenuItem key={index} style={styles.drawer.menuItem}>{cat.name}</MenuItem>
        )}
      </Drawer>
    )
  }
}

SideBar.contextTypes = {
  router: PropTypes.object.isRequired,
};

SideBar.propTypes = {
  opened: PropTypes.bool.isRequired,
  requestChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.category.loading,
  categories: state.category.categories,
});

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({loadCategories, categoriesLoaded}, dispatch)
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);