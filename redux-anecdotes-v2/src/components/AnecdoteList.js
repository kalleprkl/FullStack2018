import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notifyVoted, clearNotification } from '../reducers/notificationReducer';
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from './../services/anecdotes'

class AnecdoteList extends React.Component {

  handleClick = (anecdote) => async () => {
    this.props.anecdoteVote(anecdote)
    this.props.notifyVoted(anecdote.content)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClick(anecdote)}>
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
    anecdotesToShow: state.anecdotes.filter(a => a.content.includes(state.filter)).sort((a, b) => b.votes - a.votes)
  }
}

const actions = {
  anecdoteVote,
  notifyVoted,
  clearNotification
}

export default connect(mapStateToProps, actions)(AnecdoteList)
