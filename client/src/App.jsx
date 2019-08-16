import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { loginUser, registerUser, verifyUser, fetchPolls, createPoll, deletePoll, createChoice } from './services/api-helper'

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
      createPollError: ''
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

  setFormDataUser = () => {
    this.setState({
      registerFormData: {
        username: this.state.currentUser.username,
        email: this.state.currentUser.email,
        password: ''
      },
    })
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.loginFormData);
    this.setState({
      currentUser: userData,
      isUserEdit: false
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
        registerFormData: {
          username: '',
          email: '',
          password: ''
        }
      })
      :
      this.setState({
        registerFormData: {
          username: this.state.currentUser.username,
          email: this.state.currentUser.email,
          password: ''
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
      this.handleCreatePollError('Please fill out all voting options')
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
                handleFormChange={this.handleFormChange}
                newPollForm={this.state.newPollForm}
                newChoiceForms={this.state.newChoiceForms}
                handleChoiceChange={this.handleChoiceChange}
                handleAddChoice={this.handleAddChoice}
                handleRemoveLastChoice={this.handleRemoveLastChoice}
                handleRemoveSpecificChoice={this.handleRemoveSpecificChoice}
                resetPollForm={this.resetPollForm}
                isEdit={this.state.isUserEdit}
                updateFormData={this.state.registerFormData}
                switchBoolean={this.switchBoolean}
                handleCreatePoll={this.handleCreatePoll}
                createPollError={this.state.createPollError}
                handleDeletePoll={this.handleDeletePoll}
                toggleEditMode={this.toggleEditMode}
                handleUserUpdate={this.handleUserUpdate}
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