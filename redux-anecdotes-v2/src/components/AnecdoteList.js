import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notifyVoted, clearNotification } from '../reducers/notificationReducer';

class AnecdoteList extends React.Component {

  handleClick = (id, content) => () => {
    this.props.store.dispatch(anecdoteVote(id))
    this.props.store.dispatch(notifyVoted(content))
    const timer = setTimeout(() => {
      this.props.store.dispatch(clearNotification(timer))
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClick(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
