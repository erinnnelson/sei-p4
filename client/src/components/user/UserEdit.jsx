import React from 'react';

import UserEditForm from './UserEditForm'

const UserEdit = (props) => {
  return (
    <div id="user-edit-container">
      <h2 id='user-edit-header'>Profile</h2>
      <UserEditForm
          handleUpdateUser={props.handleUpdateUser}
          handleChange={props.handleFormChange}
          formData={props.formData}
      />
      <p onClick={() => (props.switchBoolean('isUserEdit'))}>cancel</p>
      <button onClick={props.handleDeleteUser}>Delete Account</button>
    </div>
  )
}

export default UserEdit;
