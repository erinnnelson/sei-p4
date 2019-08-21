import React from 'react';
import { Link, Route } from 'react-router-dom';

const Login = (props) => {

  return (
    <div id='login-container'>
      <form onSubmit={(ev) => {
        props.handleLogin(ev);
      }} >
        <div id='login-inputs' className='form-divs'>
        <input
          name='username'
          type='text'
          placeholder='username...'
            value={props.formData.username}
            autocomplete='off'
          onChange={(ev) => {
            props.handleChange(ev, 'loginFormData')
          }} />
        <br />
        <input
          name='password'
          type='password'
          placeholder='password...'
            value={props.formData.password}
            autocomplete='off'
          onChange={(ev) => {
            props.handlePasswordChange(ev, 'loginFormData')
          }} />
        </div>
        <button className='buttons-form-submit'>SIGN IN</button>
      </form>
      <p>{props.loginRegisterError}</p>
    </div>
  );
}

export default Login;
