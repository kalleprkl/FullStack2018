import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notifyVoted, clearNotification } from '../reducers/notificationReducer';
import Filter from './Filter'

class AnecdoteList extends React.Component {

  handleClick = (id, content) => () => {
    this.props.store.dispatch(anecdoteVote(id))
    this.props.store.dispatch(notifyVoted(content))
    setTimeout(() => {
      this.props.store.dispatch(clearNotification())
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes).map(anecdote =>
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
