import React from 'react';

const UserEditForm = (props) => {

  return (
    <div className="user-edit-form-container">
      <hr />
      <form onSubmit={(ev) => (props.handleUpdateUser(ev))} >
        <p>update username</p>
        <input
          name='username'
          type='text'
          placeholder='username...'
          value={props.formData.username}
          onChange={(ev) => {
            props.handleChange(ev, 'updateUserFormData')
          }} />
        <p>update email</p>
        <input
          name='email'
          type='text'
          placeholder='email...'
          value={props.formData.email}
          onChange={(ev) => {
            props.handleChange(ev, 'updateUserFormData')
          }} />
        <button>update!</button>
      </form>
    </div>
  );
}

export default UserEditForm;
