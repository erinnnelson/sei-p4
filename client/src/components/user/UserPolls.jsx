import React from 'react';
import PollDiv from './PollDiv'

const UserPolls = (props) => {

  return (
    <div className="user-polls-container">
      <h2 id='poll-history-header'>QwickPoll History</h2>
      {props.polls && props.polls.slice(0).reverse().map(poll => (
        <div key={poll.id}>
            <PollDiv
            poll={poll}
            handleDeletePoll={props.handleDeletePoll}
            />
        </div>
      ))}
    </div>
  );
}

export default UserPolls;
