import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { loginUser, registerUser, verifyUser, fetchPolls, updateUser, deleteUser, createPoll, deletePoll, createChoice } from './services/api-helper'
import decode from 'jwt-decode'

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
      updateUserFormData: {
        username: '',
        email: ''
      },
      newPollForm: {
        title: '',
        open: true,
        user_id: null
      },
      newChoiceForms: [
        {
          name: '',
          option_position: 0
        },
        {
          name: '',
          option_position: 1
        }
      ],
      stagedChoices: [],
      registerFormView: false,
      showPoll: null,
      isUserEdit: false,
      createPollError: '',
      LoginRegisterError: ''
    })
  }

  componentDidMount = async () => {
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user,
        newPollForm: {
          title: '',
          open: true,
          user_id: user.id
        },
        newChoiceForms: [
          {
            name: '',
            option_position: 0
          },
          {
            name: '',
            option_position: 1
          }
        ]
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

  resetLoginRegisterError = () => {
    this.setState({
      loginRegisterError: ''
    })
  }

  handleCreateLoginRegisterError = (message) => {
    this.setState({
      loginRegisterError: message
    })
    setTimeout(this.resetLoginRegisterError, 2000)
  }

  handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      const userData = await loginUser(this.state.loginFormData);
      this.setState({
        currentUser: userData,
      })
      this.resetUserEdit()
      this.clearFormData()
      this.updatePolls()
      this.setState({
        newPollForm: {
          title: '',
          open: true,
          user_id: this.state.currentUser.id
        },
        newChoiceForms: [
          {
            name: '',
            option_position: 0
          },
          {
            name: '',
            option_position: 1
          }
        ]
      })
    } catch (ev) {
      this.handleCreateLoginRegisterError('Invalid login info');
    }
  }

  registerFrontEndCheck = () => {
    let acceptedCharacters = /^[0-9a-zA-Z]+$/;
    if (this.state.registerFormData.username.length === 0) {
      this.handleCreateLoginRegisterError('Username cannot be blank')
      return false;
    }
    if (this.state.registerFormData.username.length > 16) {
      this.handleCreateLoginRegisterError('Username must be 16 characters or less')
      return false;
    }
    if (!/^[0-9a-zA-Z_.-]+$/.test(this.state.registerFormData.username)) {
      this.handleCreateLoginRegisterError('Invalid characters in username')
      return false;
    }
    return true

  }

  handleRegister = async (ev) => {
    ev.preventDefault();
    if (!this.registerFrontEndCheck()) {
      return
    }
    try {
      await registerUser(this.state.registerFormData);
      const userData = await loginUser(this.state.registerFormData);
      this.setState({
        currentUser: userData,
        registerFormView: false
      })
      this.resetUserEdit()
      this.clearFormData()
      this.updatePolls()
      this.setState({
        newPollForm: {
          title: '',
          open: true,
          user_id: this.state.currentUser.id
        },
        newChoiceForms: [
          {
            name: '',
            option_position: 0
          },
          {
            name: '',
            option_position: 1
          }
        ]
      })
    } catch (ev) {
      this.handleCreateLoginRegisterError(ev.response.data[0]);
    }
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({
      currentUser: null
    });
    this.props.history.push(`/`)
  }

  switchBoolean = (switchView) => {
    this.setState(prevState => ({
      [switchView]: !prevState[switchView]
    }));
  }

  switchRegisterFormView = () => {
    this.clearFormData()
    this.switchBoolean('registerFormView')
  }

  toggleEditMode = () => {
    this.switchBoolean('isUserEdit')
    this.state.isUserEdit
      ?
      this.setState({
        updateUserFormData: {
          username: '',
          email: '',
        }
      })
      :
      this.setState({
        updateUserFormData: {
          username: this.state.currentUser.username,
          email: this.state.currentUser.email,
        }
      })
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

  handleLoginRegisterFormChange = (ev, formName) => {
    const { name, value } = ev.target;
    const lowerCaseValue = value.toLowerCase();
    this.setState(prevState => ({
      [formName]: {
        ...prevState[formName],
        [name]: lowerCaseValue
      }
    }));
  }

  handleChoiceChange = (ev, i) => {
    const { name, value } = ev.target;
    this.setState(prevState => {
      const newArr = prevState.newChoiceForms
      newArr[i][name] = value
      return {
        newChoiceForms: newArr
      }
    });
  }

  reorderChoicePositions = () => {
    this.setState(prevState => {
      const newArr = prevState.newChoiceForms
      newArr.map((choice, i) => {
        choice.option_position = i
      })
      return {
        newChoiceForms: newArr
      }
    });
  }

  handleAddChoice = () => {
    this.setState(prevState => ({
      newChoiceForms: [...prevState.newChoiceForms, {
        name: '',
        option_position: this.state.newChoiceForms.length
      }]
    }))
  }

  handleRemoveLastChoice = () => {
    this.setState(prevState => ({
      newChoiceForms: [...prevState.newChoiceForms.slice(0, prevState.newChoiceForms.length - 1)]
    }))
  }

  handleRemoveSpecificChoice = (i) => {
    this.setState(prevState => ({
      newChoiceForms: prevState.newChoiceForms.filter((choice, x) => (
        i !== x
      ))
    }))
    this.reorderChoicePositions()
  }

  updatePolls = async () => {
    if (this.state.currentUser) {
      const polls = await fetchPolls()
      this.setState({
        currentUserPolls: polls,
      });
    }
  }

  resetPollForm = () => {
    this.setState({
      newPollForm: {
        title: '',
        open: true,
        user_id: this.state.currentUser.id
      },
      newChoiceForms: [
        {
          name: '',
        },
        {
          name: '',
        }
      ]
    })
  }

  resetCreatePollError = () => {
    this.setState({
      createPollError: ''
    })
  }

  handleCreatePollError = (message) => {
    this.setState({
      createPollError: message
    })
    setTimeout(this.resetCreatePollError, 2000)
  }

  handleCheckPollFormData = () => {
    if (!this.state.newPollForm.title.length) {
      this.handleCreatePollError('Please add a question')
      return false
    }
    let choiceError = false
    this.state.newChoiceForms.map(choice => {
      if (!choice.name.length) {
        choiceError = true;
      }
    })
    if (choiceError) {
      this.handleCreatePollError('Please fill in all options')
      return false
    }
    return true;
  }

  handleCreatePoll = async (ev) => {
    ev.preventDefault();
    if (this.handleCheckPollFormData()) {
      let newPoll = await createPoll(this.state.newPollForm);
      const allChoices = await Promise.all(this.state.newChoiceForms.map(async (choice) => {
        return await createChoice(newPoll.id, choice);
      }))
      newPoll = { ...newPoll, choices: allChoices }
      this.setState(prevState => ({
        currentUserPolls: [...prevState.currentUserPolls, newPoll]
      }))
      this.resetPollForm();
      this.props.history.push(`/poll/${newPoll.id}`)
    } else {
      return
    }
  }

  handleDeletePoll = async (id) => {
    const deletedPoll = await deletePoll(id);
    this.setState(prevState => ({
      currentUserPolls: prevState.currentUserPolls.filter(poll => (
        poll.id !== deletedPoll.id
      ))
    }))
  }

  resetUserEdit = () => {
    this.setState({
      isUserEdit: false
    })
  }

  handleUpdateUser = async (ev) => {
    ev.preventDefault();
    const updatedUser = await updateUser(this.state.currentUser.id, this.state.updateUserFormData)
    // const userData = await loginUser(this.state.registerFormData);
    this.setState({
      currentUser: updatedUser,
    })
    this.resetUserEdit();
  }

  handleDeleteUser = async () => {
    await deleteUser(this.state.currentUser.id)
    this.handleLogout()
  }

  render() {
    return (
      <div className="app">
        <header>
          <div id='header-overlay'>
            <Link to='/' id='logo-link'><h1 onClick={this.resetUserEdit} id='logo'>qwp</h1></Link>
            {this.state.currentUser &&
              <nav>
                <Link to='/' id='nav-username-link'><p id='nav-username' onClick={this.resetUserEdit}>{this.state.currentUser.username}</p></Link>
                <button id='nav-logout' onClick={this.handleLogout}>logout</button>
              </nav>
            }
          </div>
        </header>
        <main>

          {/* USERPAGE VIEW */}
          <Route exact path='/' render={() => (
            this.state.currentUser
              ?
              <UserPage
                polls={this.state.currentUserPolls}
                handleFormChange={this.handleFormChange}
                newPollForm={this.state.newPollForm}
                newChoiceForms={this.state.newChoiceForms}
                handleChoiceChange={this.handleChoiceChange}
                handleAddChoice={this.handleAddChoice}
                handleRemoveLastChoice={this.handleRemoveLastChoice}
                handleRemoveSpecificChoice={this.handleRemoveSpecificChoice}
                resetPollForm={this.resetPollForm}
                isEdit={this.state.isUserEdit}
                updateUserFormData={this.state.updateUserFormData}
                switchBoolean={this.switchBoolean}
                handleCreatePoll={this.handleCreatePoll}
                createPollError={this.state.createPollError}
                handleDeletePoll={this.handleDeletePoll}
                toggleEditMode={this.toggleEditMode}
                handleUpdateUser={this.handleUpdateUser}
                handleDeleteUser={this.handleDeleteUser}
              />
              :
              <LoginRegister
                handleLogin={this.handleLogin}
                handleRegister={this.handleRegister}
                loginFormData={this.state.loginFormData}
                registerFormData={this.state.registerFormData}
                handleFormChange={this.handleLoginRegisterFormChange}
                handlePasswordChange={this.handleFormChange}
                registerFormView={this.state.registerFormView}
                switchRegisterFormView={this.switchRegisterFormView}
                loginRegisterError={this.state.loginRegisterError}
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
                handlePasswordChange={this.handleFormChange}
                registerFormView={this.state.registerFormView}
                switchRegisterFormView={this.switchRegisterFormView}
                loginRegisterError={this.state.loginRegisterError}
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