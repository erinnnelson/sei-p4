import React from 'react';

import UserEditForm from './UserEditForm'

const UserEdit = (props) => {
  return (
    <div id="user-edit-container">
      <div id='user-edit-update-and-cancel'>
        <h2 id='user-edit-header'>Profile</h2>
        <UserEditForm
          handleUpdateUser={props.handleUpdateUser}
          handleChange={props.handleFormChange}
          formData={props.formData}
        />
        <p id='edit-user-cancel' onClick={props.editUserSwitch}>cancel</p>
      </div>
      <div id='user-delete-container'>
        {props.deleteUserCheck
          ?
          <div id='user-delete-check-container'>
            <button id='user-actual-delete' onClick={props.handleDeleteUser}>ARE YOU SURE?</button><br />
            <p id='user-delete-cancel' onClick={() => (props.switchBoolean('deleteUserCheck'))}>CANCEL</p>
          </div>
          :
          <button id='user-delete-request' onClick={() => (props.switchBoolean('deleteUserCheck'))}>DELETE ACCOUNT</button>
        }
      </div>
    </div>
  )
}

export default UserEdit;
