import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.anecdoteCreation(content)
    this.props.notify(`you have created "${content}"`, 5)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const actions = {
  anecdoteCreation,
  notify
}

export default connect(null, actions)(AnecdoteForm)
