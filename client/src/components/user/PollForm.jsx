import React from 'react';

import UserPolls from './UserPolls'

const PollForm = (props) => {
  return (
    <div className="poll-form">
      <form>
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
          <input
            key={i}
            type='text'
            name='name'
            placeholder={`Option ${i + 1}`}
            value={choice.name}
            onChange={(ev) => {
              props.handleChoiceChange(ev, i)
            }}
          />
        ))}
      </form>
      <button onClick={props.handleAddChoice}>Add Option</button>
      <button onClick={props.handleRemoveChoice}>Remove Option</button>
      <button onClick={props.handleRemoveChoice}>Reset</button>

    </div>
  )
}

export default PollForm;
