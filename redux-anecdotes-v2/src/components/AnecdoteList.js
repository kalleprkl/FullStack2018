import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer';
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleClick = (anecdote) => async () => {
    this.props.anecdoteVote(anecdote)
    this.props.notify(`you have voted "${anecdote.content}"`, 5)
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
  notify
}

export default connect(mapStateToProps, actions)(AnecdoteList)
