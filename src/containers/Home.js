import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'


class Home extends Component {
  render() {
    return (
      <div>
        Home Page
      </div>
    );
  }
}

export default withRouter(Home)