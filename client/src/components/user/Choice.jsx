import React from 'react';
import { Link, Route } from 'react-router-dom';

const renderVoteInfo = (choice, votes) => {
  let result;
  if (choice.users.length !== 1) {
    result = 'votes'
  } else {
    result = 'vote'
  }
  return `${result} | ${Math.round(100 * (choice.users.length / votes))}`
}

const Choice = (props) => {

  return (
    <div className="choice-container">
      <p>{props.choice.name} - {props.choice.users.length} {renderVoteInfo(props.choice, props.votes)} %</p>
    </div>
  );
}

export default Choice;