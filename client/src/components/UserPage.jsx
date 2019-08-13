import React from 'react';

import { fetchUser, fetchPolls } from '../services/api-helper'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      polls: []
    }
  }

  componentDidMount = async () => {
    const user = await fetchUser(this.props.user_id)
    // const polls = await fetchPolls(this.props.user_id)
    this.setState({
      user: user,
      // polls: polls
    })
  }

  render() {
    return (
      <div className="user-page-container">
        <h1>{this.state.user.username}</h1>
        {this.state.polls.map(poll => (
          <h2>{poll.title}</h2>
        ))}

      </div>
    );
  }
}

export default UserPage;
