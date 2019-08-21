import React from 'react';

const Register = (props) => {

  return (
    <div id='register-container'>
      <form onSubmit={(ev) => {
        props.handleRegister(ev)
      }} >
        <div id='register-inputs' className='form-divs'>
          <input
            name='username'
            type='text'
            placeholder='username...'
            value={props.formData.username}
            autoComplete='off'
            onChange={(ev) => {
              props.handleChange(ev, 'registerFormData')
            }} />
          <br />
          <input
            name='email'
            type='text'
            placeholder='email...'
            value={props.formData.email}
            autoComplete='off'
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
              props.handlePasswordChange(ev, 'registerFormData')
            }} />
        </div>
        <button className='buttons-form-submit'>SIGN UP</button>
      </form>
      <p>{props.loginRegisterError}</p>
    </div>
  );
}

export default Register;
