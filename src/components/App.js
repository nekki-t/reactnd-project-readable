import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../App.css';

/*--- Material UI ---*/
import AppBar from 'material-ui/AppBar';

/*--- Constants ---*/
import { URL } from '../constants';

/*--- Components ---*/
import SideBar from './SideBar';
import Main from './Main';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {categoryBarOpened: false};

    this.toggleCategoryBar = this.toggleCategoryBar.bind(this);
  }

  toggleCategoryBar() {
    this.setState({
      categoryBarOpened: !this.state.categoryBarOpened
    });
  }

  render() {
    const styles = {};
    styles.appBar = {
      backgroundColor: '#3F51B5'
    };

    return (
      <div className="base">
        <AppBar
          title="Readable"
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.toggleCategoryBar}
        />
        <Router>
          <div>
            <SideBar
              opened={this.state.categoryBarOpened}
              requestChange={this.toggleCategoryBar}
            />
            <Switch>
              <Route exact={true} path={URL.ROOT} component={Main}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
