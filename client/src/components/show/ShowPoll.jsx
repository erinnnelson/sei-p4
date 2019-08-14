import React from 'react';
import { Link, Route } from 'react-router-dom';
import { fetchPoll, addUserVote } from '../../services/api-helper'


import VoteChoice from './VoteChoice'

class ShowPoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      poll: null,
      votes: 0,
      alreadyVoted: false
    })
  }

  componentDidMount = async () => {
    const poll = await fetchPoll(this.props.pollId)
    this.setState({
      poll: poll
    })
    this.voteCount();
  }

  voteCount = () => {
    this.state.poll.choices.map(choice => {
      const votes = choice.users.length
      this.setState(prevState => ({
        votes: prevState.votes + votes
      }))
    })
  }

  flipBack = () => {
    this.setState({
      alreadyVoted: false
    })
  }

  userVote = async (choiceId) => {
    const updatedPoll = await addUserVote(this.state.poll.id, choiceId)
    if (updatedPoll) {
      this.setState({
        poll: updatedPoll,
        votes: 0
      })
      this.voteCount();
    } else {
      this.setState({
        alreadyVoted: true
      })
      setTimeout(this.flipBack, 2000)
    }
  }

  render() {
    return (
      <div className="show-poll-container">
        <h2>{this.state.poll && this.state.poll.title}</h2>
        {this.state.poll && this.state.poll.choices.map(choice => (
          <div key={choice.id}>
            <VoteChoice
              choice={choice}
              votes={this.state.votes}
              userVote={this.userVote}
            />

          </div>
        ))}
        <p>{this.state.votes} total votes</p>
        {this.state.alreadyVoted ? "Already Voted" : ""}
      </div>
    );
  }
}

export default ShowPoll;
