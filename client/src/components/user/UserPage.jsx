import React from 'react';
import UserPolls from './UserPolls'

const UserPage = (props) => {
  return (
    <div className="user-page-container">
      <UserPolls
        polls={props.polls}
      />
    </div>
  )
}

export default UserPage;
