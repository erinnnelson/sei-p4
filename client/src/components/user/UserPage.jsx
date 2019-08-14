import React from 'react';
import UserPolls from './UserPolls'
// import PollForm from './PollForm'

const UserPage = (props) => {
  return (
    <div className="user-page-container">
      {/* <PollForm
        polls={props.polls}
      /> */}
      <UserPolls
        polls={props.polls}
      />
    </div>
  )
}

export default UserPage;
