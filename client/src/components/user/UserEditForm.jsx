import React from 'react';

const UserEditForm = (props) => {

  return (
    <div className="user-edit-form-container">
      <form onSubmit={(ev) => (props.handleUpdateUser(ev))} >
        <p>Update Profile</p>
        <input
          name='username'
          type='text'
          placeholder='username...'
          value={props.formData.username}
          onChange={(ev) => {
            props.handleChange(ev, 'updateUserFormData')
          }} />
        <br />
        <input
          name='email'
          type='text'
          placeholder='email...'
          value={props.formData.email}
          onChange={(ev) => {
            props.handleChange(ev, 'updateUserFormData')
          }} />
        <br />
        <button>update!</button>
      </form>
    </div>
  );
}

export default UserEditForm;
