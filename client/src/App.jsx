import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Login from './components/Login'
import Register from './components/Register'
import UserPage from './components/UserPage'

import { loginUser, registerUser, verifyUser, fetchPolls } from './services/api-helper'

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
      }
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
  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.loginFormData);
    this.setState({
      currentUser: userData,
      loginFormData: {
        username: '',
        password: ''
      }
    })
    this.updatePolls()
  }

  handleRegister = async (ev) => {
    ev.preventDefault();
    await registerUser(this.state.registerFormData);
    const userData = await loginUser(this.state.registerFormData);
    this.setState({
      currentUser: userData,
      registerFormData: {
        username: '',
        email: '',
        password: ''
      },
    })
    this.updatePolls()
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({
      currentUser: null
    })
  }

  handleAuthChange = (ev, formName) => {
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
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>logout</button>
              </>
              :
              <Link to='/'><button>login</button></Link>
            }
          </div>
          {this.state.currentUser && <Link to={`/`}>profile</Link>}
        </header>
        <main>
          <Route exact path='/register' render={() => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.handleAuthChange}
              formData={this.state.registerFormData}
            />
          )} />
          <Route exact path='/' render={() => (
            this.state.currentUser
              ?
              <UserPage
                user={this.state.currentUser}
                polls={this.state.currentUserPolls}
              />
              :
              <Login
              handleLogin={this.handleLogin}
              handleChange={this.handleAuthChange}
              formData={this.state.loginFormData}
            />
          )} />
        </main>



      </div>
    );
  }
}

export default withRouter(App);