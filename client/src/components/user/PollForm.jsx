import React from 'react';

import UserPolls from './UserPolls'

const PollForm = (props) => {
  return (
    <div id='poll-form-container'>
      <h2 id='poll-form-header'>New QwickPoll</h2>
      <form onSubmit={(ev) => (props.handleCreatePoll(ev))}>
        <div id='poll-form-inputs' className='form-divs'>
          <input
            type='text'
            name='title'
            placeholder='Question...'
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
                placeholder={`Option ${i + 1}...`}
                value={choice.name}
                onChange={(ev) => {
                  props.handleChoiceChange(ev, i)
                }}
              />
              <input
                type="hidden"
                value={choice.option_position}
              />
              {props.newChoiceForms.length > 2 && <div className='delete-choice-x' onClick={() => (props.handleRemoveSpecificChoice(i))}>X</div>}
            </div>
          ))}
        </div>
        <button className='buttons-form-submit'>CREATE</button>
      </form>
      <button onClick={props.handleAddChoice}>Add Option</button>
      {props.newChoiceForms.length > 2 && <button onClick={props.handleRemoveLastChoice}>Remove Option</button>}
      <button onClick={props.resetPollForm}>Reset</button>
      {props.createPollError && <p>{props.createPollError}</p>}

    </div>
  )
}

export default PollForm;
