import React from 'react';

import UserEditForm from './UserEditForm'

const UserEdit = (props) => {
  return (
    <div className="user-edit-container">
      <UserEditForm
          handleUpdateUser={props.handleUpdateUser}
          handleChange={props.handleFormChange}
          formData={props.formData}
      />
      <button onClick={props.handleDeleteUser}>Delete Account</button>
    </div>
  )
}

export default UserEdit;
