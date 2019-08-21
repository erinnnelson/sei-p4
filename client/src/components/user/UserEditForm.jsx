import React from 'react';

const UserEditForm = (props) => {

  return (
    <div id="user-edit-form-container">
      <form onSubmit={(ev) => (props.handleUpdateUser(ev))} >
        <div id='edit-profile-inputs' className='form-divs'>
        <input
          name='username'
          type='text'
          placeholder='username...'
            value={props.formData.username}
            autoComplete='off'
          onChange={(ev) => {
            props.handleChange(ev, 'updateUserFormData')
          }} />
        <br />
        <input
          name='email'
          type='text'
          placeholder='email...'
            value={props.formData.email}
            autoComplete='off'
          onChange={(ev) => {
            props.handleChange(ev, 'updateUserFormData')
            }} />
          </div>
        <button className='buttons-form-submit'>UPDATE</button>
      </form>
    </div>
  );
}

export default UserEditForm;
