import React from 'react';
import { Link, Route } from 'react-router-dom';

class PollDiv extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      votes: 0,
      deleteCheck: false
    })
  }

  componentDidMount = () => {
    this.voteCount();
  }

  reorderedChoices = () => {
    const orderedChoices = this.props.poll.choices.sort((a, b) => (
      (a.option_position > b.option_position) ? 1 : -1
    ))
    return orderedChoices
  }

  voteCount = () => {
    this.props.poll.choices.map(choice => {
      const votes = choice.users.length
      this.setState(prevState => ({
        votes: prevState.votes + votes
      }))
    })
  }

  deleteCheckSwitch = () => {
    this.setState(prevState => ({
      deleteCheck: !prevState.deleteCheck
    }))
  }

  findWinners = () => {
    const sortChoices = this.props.poll.choices.sort((a, b) => (
      (a.users.length > b.users.length) ? -1 : 1
    ))

    const checkTie = sortChoices.filter(choice => (
      choice.users.length === sortChoices[0].users.length
    ))
    const winners = []
    checkTie.map(choice => (
      winners.push(choice.name)
    ))
    return winners;
  }


  render() {
    return (
      <div className="poll-div-container">
        <Link to={`/poll/${this.props.poll.id}`}>
          <h2>{this.props.poll.title}</h2>
          {this.findWinners().length > 1
            ?
            <p className='poll-data-overview'>Tied Vote: {this.findWinners().join(', ')}</p>
            :
            <p className='poll-data-overview'>Top Vote: {this.findWinners().join(', ')}</p>
        }
          <p>{this.state.votes} total votes</p>
        </Link>
        {this.state.deleteCheck
          ?
          <div>
            <p>ARE YOU SURE?</p>
            <button onClick={() => (this.props.handleDeletePoll(this.props.poll.id))}>DELETE</button>
            <button onClick={this.deleteCheckSwitch}>cancel</button>
          </div>
          :
          <button onClick={this.deleteCheckSwitch}>delete</button>
        }
      </div>
    );
  }
}

export default PollDiv;
