import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notifyVoted, clearNotification } from '../reducers/notificationReducer';
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleClick = (id, content) => () => {
    this.props.anecdoteVote(id)
    this.props.notifyVoted(content)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)
  }

  render() {
    const anecdotes = this.props.anecdotes
    const filter = this.props.filter
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const actions = {
  anecdoteVote,
  notifyVoted,
  clearNotification
}

export default connect(mapStateToProps, actions)(AnecdoteList)
