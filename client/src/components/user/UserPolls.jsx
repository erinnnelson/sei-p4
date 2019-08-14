import React from 'react';
import { Link, Route } from 'react-router-dom';
import PollDiv from './PollDiv'

const UserPolls = (props) => {

  return (
    <div className="polls-container">
      {props.polls && props.polls.slice(0).reverse().map(poll => (
        <Link to={`/poll/${poll.id}`}>
          <div key={poll.id}>
            <PollDiv
              poll={poll}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default UserPolls;
