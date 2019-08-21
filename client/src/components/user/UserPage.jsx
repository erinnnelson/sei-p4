import React from 'react';
import { Route, Link } from 'react-router-dom';
import UserEdit from './UserEdit';


import UserPolls from './UserPolls'
import PollForm from './PollForm'

const UserPage = (props) => {
  return (
    <div className="user-page-container">
      {!props.isEdit && <button id='button-profile-edit' onClick={props.toggleEditMode}>edit profile</button>}
      {props.isEdit
        ?
        <div>
          <UserEdit
            handleFormChange={props.handleEditProfileFormChange}
            formData={props.updateUserFormData}
            handleUpdateUser={props.handleUpdateUser}
            handleDeleteUser={props.handleDeleteUser}
            switchBoolean={props.switchBoolean}
            deleteUserCheck={props.deleteUserCheck}
            resetDeleteUserCheck={props.resetDeleteUserCheck}
            editUserSwitch={props.editUserSwitch}
          />
        </div>
        :
        <div>
          <PollForm
            handleFormChange={props.handleFormChange}
            newPollForm={props.newPollForm}
            newChoiceForms={props.newChoiceForms}
            handleChoiceChange={props.handleChoiceChange}
            handleAddChoice={props.handleAddChoice}
            handleRemoveLastChoice={props.handleRemoveLastChoice}
            handleRemoveSpecificChoice={props.handleRemoveSpecificChoice}
            resetPollForm={props.resetPollForm}
            handleCreatePoll={props.handleCreatePoll}
            createPollError={props.createPollError}
          />
          {props.polls.length
            ?
            <UserPolls
              polls={props.polls}
              handleDeletePoll={props.handleDeletePoll}
            />
            :
            ''
          }
        </div>
      }
    </div>
  )
}

export default UserPage;
