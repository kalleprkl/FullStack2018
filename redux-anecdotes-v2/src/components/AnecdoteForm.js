import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notifyCreated, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    this.props.anecdoteCreation(newAnecdote)
    this.props.notifyCreated(newAnecdote.content)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)
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


export default connect(null,
  {
    anecdoteCreation,
    notifyCreated,
    clearNotification
  })(AnecdoteForm)
