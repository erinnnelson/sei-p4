import React from 'react';
import { Link, Route } from 'react-router-dom';


const voteSyntax = (choice) => {
  if (choice.users.length === 1) {
    return 'vote'
  } else {
    return 'votes'
  }
}

const votePercentage = (choice, votes) => {
  if (votes > 0) {
    return ` | ${Math.round(100 * (choice.users.length / votes))}%`
  } else
    return ''
}
const renderVoteCount = (choice) => {
  return `${choice.users.length} ${voteSyntax(choice)}`
}

const Choice = (props) => {
  return (
    <div className="choice-container">
      <p>{props.choice.name} - {renderVoteCount(props.choice)}{votePercentage(props.choice, props.votes)}</p>
    </div>
  );
}

export default Choice;