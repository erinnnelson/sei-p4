import React from 'react';
import { Link, Route } from 'react-router-dom';
import Choice from './Choice'

class PollDiv extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      votes: 0,
      choices: [],
      deleteCheck: false
    })
  }

  componentDidMount = () => {
    this.voteCount();


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


  render() {
    return (
      <div className="poll-div-container">
        <Link to={`/poll/${this.props.poll.id}`}>
          <h2>{this.props.poll.title}</h2>
          {this.props.poll.choices.map(choice => (
            <div key={choice.id}>
              <Choice
                choice={choice}
                votes={this.state.votes}
              />

            </div>
          ))}
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
