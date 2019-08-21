import React from 'react';
import { fetchPoll, addUserVote } from '../../services/api-helper'
import { CopyToClipboard } from 'react-copy-to-clipboard'


import VoteChoice from './VoteChoice'

class ShowPoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      poll: null,
      choices: [],
      votes: 0,
      alreadyVoted: false,
      copied: false
    })
  }

  componentDidMount = async () => {
    const poll = await fetchPoll(this.props.pollId)
    const orderedChoices = poll.choices.sort((a, b) => (
      (a.option_position > b.option_position) ? 1 : -1
    ))
    this.setState({
      poll: poll,
      choices: orderedChoices
    })
    this.voteCount();
  }

  voteCount = () => {
    this.state.poll.choices.map(choice => {
      const votes = choice.users.length
      this.setState(prevState => ({
        votes: prevState.votes + votes
      }))
      return null
    })
  }

  flipAlreadyVotedBack = () => {
    this.setState({
      alreadyVoted: false
    })
  }

  flipCopiedBack = () => {
    this.setState({
      copied: false
    })
  }

  copyURL = () => {
    console.log('hello')
    this.setState({
      copied: true
    })
    setTimeout(this.flipCopiedBack, 2000)
  }

  userVote = async (choiceId) => {
    const updatedPoll = await addUserVote(this.state.poll.id, choiceId)
    if (updatedPoll) {
      const orderedChoices = updatedPoll.choices.sort((a, b) => (
        (a.option_position > b.option_position) ? 1 : -1
      ))
      this.setState({
        poll: updatedPoll,
        choices: orderedChoices,
        votes: 0
      })
      this.props.updatePolls();
      this.voteCount();
    } else {
      this.setState({
        alreadyVoted: true
      })
      setTimeout(this.flipAlreadyVotedBack, 2000)
    }
  }

  render() {
    return (
      <div id='show-poll-outer-container'>
        <div id='show-poll-container'>
          <h2>{this.state.poll && this.state.poll.title}</h2>
          {this.state.choices.map(choice => (
            <div key={choice.id}>
              <VoteChoice
                choice={choice}
                votes={this.state.votes}
                userVote={this.userVote}
              />

            </div>
          ))}
          <p className='total-votes'>{this.state.votes} total votes</p>
          {this.state.alreadyVoted ? <p id='already-voted-error'>Already Voted</p> : ''}
        </div>
        {this.state.copied
          ?
          <p id='url-copy-success'>COPIED!</p>
          :
          <CopyToClipboard text={window.location.href}>
            <p id='url-copy-request' onClick={this.copyURL}>Copy URL</p>
          </CopyToClipboard>
        }
      </div>
    );
  }
}

export default ShowPoll;
