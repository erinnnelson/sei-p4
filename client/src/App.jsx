import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Login from './components/Login'
import Register from './components/Register'
import UserPage from './components/UserPage'

import { loginUser, registerUser, verifyUser } from './services/api-helper'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      currentUser: null,
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
        currentUser: user
      })
    }
  }

  // AUTH
  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.loginFormData);
    this.setState({
      currentUser: userData
    })
  }

  handleRegister = async (ev) => {
    ev.preventDefault();
    await registerUser(this.state.registerFormData);
    this.handleLogin();
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
              <Link to='/login'><button>login</button></Link>
            }
          </div>
          <Link to='/user/:id'>profile</Link>
        </header>
        <main>
          <Route exact path='/login' render={() => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.handleAuthChange}
              formData={this.state.loginFormData}
            />
          )}/>
          <Route exact path='/register' render={() => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.handleAuthChange}
              formData={this.state.registerFormData}
            />
          )} />
          <Route exact path='/user/:id' render={(props) => (
            <UserPage
              user_id={props.match.params.id}
            />
          )}/>
        </main>



      </div>
    );
  }
}

export default withRouter(App);