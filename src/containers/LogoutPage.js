import React, {Component} from 'react'
import {connect} from 'react-redux'
import actionTypes from "../constants/actionTypes"

class LogoutPage extends Component {

  componentWillMount() {
    this.props.dispatch({
      type: actionTypes.auth.LOGOUT_REQUEST
    })
  }

  render() {
    return null;
  }
}

export default connect()(LogoutPage);