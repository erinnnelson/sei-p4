import React from 'react';
import { Link } from 'react-router-dom';

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
      return null
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
        <h2>{this.props.poll.title}</h2>
        <div className='poll-summary-container'>
          <Link to={`/poll/${this.props.poll.id}`}>
            <div className='poll-summary-container'>

              {!this.state.votes
                ?
                <div className='poll-summary-no-votes'>
                  <p>No Votes</p>
                </div>
                :
                <div className='poll-summary-winners-container'>
                  <div className='poll-summary-winners-header'>

                    {this.findWinners().length > 1
                      ?
                      <p>Tied Vote:</p>
                      :
                      <p>Top Vote:</p>
                    }
                  </div>
                  <div className='poll-summary-winners'>
                    {this.findWinners().map(winner => (
                      <div key={winner.id}>
                        {winner.length > 15
                          ?
                          <p>{winner.slice(0, 12)}...</p>
                          :
                          <p>{winner}</p>
                        }
                      </div>
                    ))}

                  </div>
                </div>
              }


            </div>
          </Link>
        </div>
        <div className='poll-delete-container'>
          {this.state.deleteCheck
            ?
            <div className='poll-delete-check-container'>
              <p className='poll-actual-delete' onClick={() => (this.props.handleDeletePoll(this.props.poll.id))}>DELETE</p>
              <p className='poll-delete-cancel' onClick={this.deleteCheckSwitch}>CANCEL</p>
            </div>
            :
            <p className='poll-delete-request' onClick={this.deleteCheckSwitch}>delete</p>
          }
        </div>
      </div>
    );
  }
}

export default PollDiv;
