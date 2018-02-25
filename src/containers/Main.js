import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from "../containers/LoginPage"
import LogoutPage from '../containers/LogoutPage'
import Home from "../containers/Home"
import Test from "../containers/Test"


class Main extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/logout/' component={LogoutPage}/>
          <Route path='/test' component={Test}/>
        </Switch>
    );
  }
}

export default Main