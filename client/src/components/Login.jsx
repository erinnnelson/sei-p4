import React from 'react';
import { Link, Route } from 'react-router-dom';

const Login = (props) => {

  return (
    <div id='login-container'>
      <form onSubmit={(ev) => {
        ev.preventDefault();
        props.handleLogin();}} >
        <input
          name='username'
          type='text'
          placeholder='username...'
          value={props.formData.username}
          onChange={(ev) => {
            props.handleChange(ev, 'loginFormData')
          }} />
        <br />
        <input
          name='password'
          type='password'
          placeholder='password...'
          value={props.formData.password}
          onChange={(ev) => {
            props.handleChange(ev, 'loginFormData')
          }} />
        <br />
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default Login;
