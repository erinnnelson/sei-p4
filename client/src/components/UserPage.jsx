import React from 'react';
import { useEffect } from 'react';

import { fetchUser, fetchPolls, createChoice } from '../services/api-helper'

class UserPage extends React.Component {

  // getCurrentUser = () => {
  //   useEffect(() => {
  //     console.log('I did it');
  //   });
  // }

  // componentDidMount = async () => {
  //   const polls = await fetchPolls(this.props.currentUser.id)
  //   this.setState({
  //     polls: polls
  //   })
  // }

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.currentUser !== this.props.currentUser) {
  //     const polls = await fetchPolls(this.props.currentUser.id)
  //     this.setState({
  //       polls: polls
  //     })
  //   }
  // }

  // componentWillUnmount = () => {
  //   this.setState({
  //     user: null
  //   })
  // }

  render() {
    console.log(this.props.user && this.props.user.username)
    return (
      <UserPolls
        polls={props.polls}
      />
    );
  }
}

export default UserPage;
