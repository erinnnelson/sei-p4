import React from 'react';

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

const VoteChoice = (props) => {
  return (
    <div className="vote-choice-container">
      <button className='voting-button' onClick={() => (props.userVote(props.choice.id))}>{props.choice.name}</button>
        <p className='choice-info-summary'>{renderVoteCount(props.choice)}{votePercentage(props.choice, props.votes)}</p>
    </div >
  );
}

export default VoteChoice;