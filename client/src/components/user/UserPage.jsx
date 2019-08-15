import React from 'react';
import { Route, Link } from 'react-router-dom';
import UserEdit from './UserEdit';


import UserPolls from './UserPolls'
import PollForm from './PollForm'

const UserPage = (props) => {
  return (
    <div className="user-page-container">
      {!props.isEdit && <button onClick={() => (props.switchBoolean('isUserEdit'))}>edit</button>}
      {props.isEdit
        ?
        <div>
          <p>hello</p>
          {/* <UserEdit
            handleFormChange={props.handleFormChange}
            formData={props.updateFormData}
            handleUpdate={props.handleUpdate}
          /> */}
          <button onClick={() => (props.switchBoolean('isUserEdit'))}>cancel</button>
        </div>
        :
        <div>
          <PollForm
            handleFormChange={props.handleFormChange}
            newPollForm={props.newPollForm}
            newChoiceForms={props.newChoiceForms}
            handleChoiceChange={props.handleChoiceChange}
            handleAddChoice={props.handleAddChoice}
            handleRemoveChoice={props.handleRemoveChoice}
          />
          <UserPolls
            polls={props.polls}
          />
        </div>
      }
    </div>
  )
}

export default UserPage;
