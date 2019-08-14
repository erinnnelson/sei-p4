import React from 'react';
import { Link, Route } from 'react-router-dom';
import Choice from './Choice'

class PollDiv extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      votes: 0,
      choices: []
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


  render() {
    return (
      <div className="poll-container">
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
      </div>
    );
  }
}

export default PollDiv;
