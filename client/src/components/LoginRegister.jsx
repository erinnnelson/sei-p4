import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'

// FORMAT IMPORTS!!

const LoginRegister = (props) => {

  return (
    <div>
      {props.registerFormView
        ?
        <Register
          handleRegister={props.handleRegister}
          handleChange={props.handleFormChange}
          formData={props.registerFormData}
        />
        :
        <Login
          handleLogin={props.handleLogin}
          handleChange={props.handleFormChange}
          formData={props.loginFormData} />
      }
      <button onClick={props.switchRegisterFormView}>
        {props.registerFormView
          ?
          'Login'
          :
          'Register'
      }
      </button>
    </div>
  );
}

export default LoginRegister;