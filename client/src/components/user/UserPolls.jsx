import React from 'react';
import { Link, Route } from 'react-router-dom';
import PollDiv from './PollDiv'

const UserPolls = (props) => {

  return (
    <div className="user-polls-container">
      {props.polls && props.polls.slice(0).reverse().map(poll => (

        <div key={poll.id}>
          <Link to={`/poll/${poll.id}`}>
            <PollDiv
              poll={poll}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserPolls;
