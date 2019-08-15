import React from 'react';

import UserPolls from './UserPolls'

const PollForm = (props) => {
  return (
    <div className="poll-form">
      <form onSubmit={(ev) => (props.handleCreatePoll(ev))}>
        <input
          type='text'
          name='title'
          placeholder='Type your question here...'
          value={props.newPollForm.title}
          onChange={(ev) => {
            props.handleFormChange(ev, 'newPollForm')
          }}
        />
        {props.newChoiceForms.map((choice, i) => (
          <div key={i}>
            <input
              type='text'
              name='name'
              placeholder={`Option ${i + 1}`}
              value={choice.name}
              onChange={(ev) => {
                props.handleChoiceChange(ev, i)
              }}
            />
            {props.newChoiceForms.length > 2 && <div className='delete-choice-x' onClick={() => (props.handleRemoveSpecificChoice(i))}>X</div>}
          </div>
        ))}
        <button>Create Poll</button>
      </form>
      <button onClick={props.handleAddChoice}>Add Option</button>
      {props.newChoiceForms.length > 2 && <button onClick={props.handleRemoveLastChoice}>Remove Option</button>}
      <button onClick={props.resetPollForm}>Reset</button>
      {props.createPollError && <p>{props.createPollError}</p>}

    </div>
  )
}

export default PollForm;
