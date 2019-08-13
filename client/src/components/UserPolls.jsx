import React from 'react';
import { Link, Route } from 'react-router-dom';

const UserPolls = (props) => {

  return (
    <div className="polls-container">
        {this.props.polls && this.props.polls.map(poll => (
          <div key={poll.id}>
            <h2>{poll.title}</h2>
            {poll.choices.map(choice => (
              <p>{choice.name} - {choice.users.length} votes</p>
            ))}

          </div>
        ))}
    </div>
  );
}

export default UserPolls;
