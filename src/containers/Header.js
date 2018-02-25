import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'


class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          {this.props.auth.isAuthenticated ? <li><Link to='/logout'>Logout</Link></li>  : <li><Link to='/login'>Login</Link></li>}

          {this.props.auth.isAuthenticated ? 'Welcome ' + this.props.auth.username : 'You must login'}
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Header;