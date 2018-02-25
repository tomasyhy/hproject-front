import React from 'react'
import {Field, reduxForm} from 'redux-form'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component="input"
             name="username"
             id="username"
             type="text"
             placeholder="Username or email address"
             required="required"
      />
      <Field component="input"
             name="password"
             id="password"
             type="password"
             placeholder="Password"
             required="required"
      />
      <button type="submit">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'login'
})(LoginForm);