import React from 'react';

const Register = (props) => {

  return (
    <div id='register-container'>
      <form onSubmit={props.handleRegister} >
        <input
          name='username'
          type='text'
          placeholder='username...'
          value={props.formData.username}
          onChange={(ev) => {
            props.handleChange(ev, 'registerFormData')
          }} />
        <br />
        <input
          name='email'
          type='text'
          placeholder='email...'
          value={props.formData.email}
          onChange={(ev) => {
            props.handleChange(ev, 'registerFormData')
          }} />
        <br />
        <input
          name='password'
          type='password'
          placeholder='password...'
          value={props.formData.password}
          onChange={(ev) => {
            props.handleChange(ev, 'registerFormData')
          }} />
        <br />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
