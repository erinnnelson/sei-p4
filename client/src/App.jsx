import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { loginUser, registerUser, verifyUser, fetchPolls } from './services/api-helper'

import UserPage from './components/user/UserPage'
import ShowPoll from './components/show/ShowPoll'
import LoginRegister from './components/LoginRegister'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      currentUser: null,
      currentUserPolls: [],
      registerFormData: {
        username: '',
        email: '',
        password: ''
      },
      loginFormData: {
        username: '',
        password: ''
      },
      registerFormView: false,
      showPoll: null
    })
  }

  componentDidMount = async () => {
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user,
      })
      this.updatePolls()
    }
  }

  // AUTH
  clearFormData = () => {
    this.setState({
      registerFormData: {
        username: '',
        email: '',
        password: ''
      },
      loginFormData: {
        username: '',
        password: ''
      }
    })
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.loginFormData);
    this.setState({
      currentUser: userData,
    })
    this.clearFormData()
    this.updatePolls()
  }

  handleRegister = async (ev) => {
    ev.preventDefault();
    await registerUser(this.state.registerFormData);
    const userData = await loginUser(this.state.registerFormData);
    this.setState({
      currentUser: userData,
      registerFormView: false
    })
    this.clearFormData()
    this.updatePolls()
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({
      currentUser: null
    })
  }

  switchRegisterFormView = () => {
    this.clearFormData()
    this.setState(prevState => ({
      registerFormView: !prevState.registerFormView
    }))
  }

  handleFormChange = (ev, formName) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      [formName]: {
        ...prevState[formName],
        [name]: value
      }
    }));
  }

  updatePolls = async () => {
    if (this.state.currentUser) {
      const polls = await fetchPolls()
      this.setState({
        currentUserPolls: polls,
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <Link to='/'><h1 id='logo'>qwp</h1></Link>
          {this.state.currentUser &&
            <div>
              <Link to='/'>{this.state.currentUser.username}</Link>
              <p><button onClick={this.handleLogout}>logout</button></p>
            </div>
          }
        </header>
        <main>

          {/* USERPAGE VIEW */}
          <Route exact path='/' render={() => (
            this.state.currentUser
              ?
              <UserPage
                // delete user prop? //
                user={this.state.currentUser}
                polls={this.state.currentUserPolls}
                handleChange={this.handleFormChange}
              />
              :
              <LoginRegister
                handleLogin={this.handleLogin}
                handleRegister={this.handleRegister}
                loginFormData={this.state.loginFormData}
                registerFormData={this.state.registerFormData}
                handleFormChange={this.handleFormChange}
                registerFormView={this.state.registerFormView}
                switchRegisterFormView={this.switchRegisterFormView}
              />
          )} />

          {/* SHOWPOLL VIEW */}
          <Route exact path='/poll/:id' render={(props) => (
            this.state.currentUser
              ?
              <ShowPoll
                pollId={props.match.params.id}
              />
              :
              <LoginRegister
                handleLogin={this.handleLogin}
                handleRegister={this.handleRegister}
                loginFormData={this.state.loginFormData}
                registerFormData={this.state.registerFormData}
                handleFormChange={this.handleFormChange}
                registerFormView={this.state.registerFormView}
                switchRegisterFormView={this.state.switchRegisterFormView}
              />
          )} />

          {/* HANDLE STRAY URL REQUEST */}
          <Route exact path='/:route' render={(props) => (
            this.props.history.push('/')
          )} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);