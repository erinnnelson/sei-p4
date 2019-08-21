import React from 'react';
import Login from './Login'
import Register from './Register'

// FORMAT IMPORTS!!

const LoginRegister = (props) => {

  return (
    <div id='login-register-container'>
      {props.registerFormView
        ?
        <Register
          handleRegister={props.handleRegister}
          handleChange={props.handleFormChange}
          formData={props.registerFormData}
          loginRegisterError={props.loginRegisterError}
          handlePasswordChange={props.handlePasswordChange}
        />
        :
        <Login
          handleLogin={props.handleLogin}
          handleChange={props.handleFormChange}
          formData={props.loginFormData}
          loginRegisterError={props.loginRegisterError}
          handlePasswordChange={props.handlePasswordChange}
        />
      }
      <button id='button-login-register-switch' onClick={props.switchRegisterFormView}>
        {props.registerFormView
          ?
          'USE EXISTING ACCOUNT'
          :
          'REGISTER NEW ACCOUNT'
      }
      </button>
    </div>
  );
}

export default LoginRegister;
