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

/*--- Shared ---*/
import { URL } from '../shared/constants';

/*--- Styles ---*/
import { sideBarStyles } from '../utils/styles';

const ROOT_CATEGORY = 'All';

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: ''
    };
    this.applyFilter = this.applyFilter.bind(this);
    this.linkColor = this.linkColor.bind(this);
  }

  componentWillMount() {
    const pathname = this.context.router.route.location.pathname;
    if (pathname.indexOf('/posts/') > -1) {
      const category = pathname.replace('/posts/', '');
      this.setState({
        selectedCategory: category
      });
    } else {
      this.setState({
        selectedCategory: ROOT_CATEGORY
      });
    }

    if (this.props.author) {
      this.props.actions.loadCategories();
    }
  }

  applyFilter = (filterText) => {
    this.setState({
      selectedCategory: filterText
    });
    if (filterText === ROOT_CATEGORY) {
      this.context.router.history.push(URL.ROOT);
    } else {
      this.context.router.history.push(URL.CATEGORY.replace(':category', filterText));
    }
    this.props.onClose();
  };

  linkColor = (category) => {
    const selectedStyle = {
      color: '#ff4d9a',
    };
    const defaultStyle = {
      color: '#51ff3a',
    };
    if (this.state.selectedCategory === category) {
      return selectedStyle;
    } else {
      return defaultStyle;
    }
  };

  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.opened}
        onRequestChange={this.props.requestChange}
        containerStyle={sideBarStyles.drawer}
      >
        <AppBar
          title={
            <span style={sideBarStyles.drawer.title}>Categories</span>
          }
          style={sideBarStyles.drawer.appBar}
          iconElementLeft={
            <IconButton><ForumIcon/></IconButton>
          }
          onLeftIconButtonTouchTap={() => this.props.onClose()}
          onTitleTouchTap={() => this.props.onClose()}
        />
        <MenuItem
          style={this.linkColor(ROOT_CATEGORY)}
          onClick={() => this.applyFilter(ROOT_CATEGORY)}
        >
          {ROOT_CATEGORY}
        </MenuItem>

        {this.props.categories && this.props.categories.map((cat, index) =>
          <MenuItem
            key={index}
            style={this.linkColor(cat.name)}
            onClick={() => this.applyFilter(cat.name)}
          >
            {cat.name}
          </MenuItem>
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
  onClose: PropTypes.func.isRequired,
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