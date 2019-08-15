import React from 'react';

import UserEditForm from './UserEditForm'

const UserEdit = (props) => {
  return (
    <div className="user-edit-container">
      <UserEditForm
          handleUpdate={props.handleUpdate}
          handleChange={props.handleFormChange}
          formData={props.formData}
        />
    </div>
  )
}

export default UserEdit;
