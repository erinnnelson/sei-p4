import React from 'react';

const PollForm = (props) => {
  return (
    <div id='poll-form-container'>
      <h2 id='poll-form-header' onClick={props.resetPollForm}>New QwickPoll</h2>
      <div id='poll-form-and-add-remove-options-container'>
        <form onSubmit={(ev) => (props.handleCreatePoll(ev))}>
          <div id='poll-form-inputs' className='form-divs'>
            <input
              type='text'
              name='title'
              placeholder='Question...'
              value={props.newPollForm.title}
              autoComplete='off'
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
                  autoComplete='off'
                  onChange={(ev) => {
                    props.handleChoiceChange(ev, i)
                  }}
                />
                <input
                  type="hidden"
                  value={choice.option_position}
                />
                {props.newChoiceForms.length > 2 && <span className='delete-choice-x' onClick={() => (props.handleRemoveSpecificChoice(i))}>X</span>}
              </div>
            ))}
          </div>
          {props.createPollError && <p id='create-poll-error-message'>{props.createPollError}</p>}
          <button className='buttons-form-submit'>CREATE</button>
        </form>
        <div id='add-remove-options-container'>
          {props.newChoiceForms.length > 2
            ?
            <div className='add-remove-option-container'>
              <p id='button-remove-option' className='buttons-add-remove-options' onClick={props.handleRemoveLastChoice}>-</p>
            </div>
            :
            <div className='add-remove-option-container'>
              <p id='button-remove-option-grey' className='buttons-add-remove-options'>-</p>
            </div>}
          <div className='add-remove-option-container'>
            <p id='button-add-option' className='buttons-add-remove-options' onClick={props.handleAddChoice}>+</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollForm;
