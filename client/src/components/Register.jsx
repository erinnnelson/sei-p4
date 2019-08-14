import React from 'react';

const Register = (props) => {

  return (
    <div className="register-container">
      <hr />
      <form onSubmit={props.handleRegister} >
        <input
          name='username'
          type='text'
          placeholder='username...'
          value={props.formData.username}
          onChange={(ev) => {
            props.handleChange(ev, 'registerFormData')
          }} />
        <input
          name='email'
          type='text'
          placeholder='email...'
          value={props.formData.email}
          onChange={(ev) => {
            props.handleChange(ev, 'registerFormData')
          }} />
        <input
          name='password'
          type='password'
          placeholder='password...'
          value={props.formData.password}
          onChange={(ev) => {
            props.handleChange(ev, 'registerFormData')
          }} />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
