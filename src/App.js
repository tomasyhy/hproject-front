import React, {Component} from 'react'
import {connect} from 'react-redux'
import './App.css'
import "babel-es6-polyfill"
import {withRouter} from 'react-router-dom'
import LoginPage from "./containers/LoginPage";
import Header from "./containers/Header"
import Main from "./containers/Main"
import PropTypes from 'prop-types'



class App extends Component {
  render() {
    return (
      <div>
        <Header auth={this.props.auth} />
        <Main />
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.element
};


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(
  mapStateToProps
)(App));
