import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from './services/anecdotes'

class App extends React.Component {

  componentDidMount = () => {
    this.props.anecdoteInitialization()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        {this.props.notifications.length === 0 ? '' : <Notification />}
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps, { anecdoteInitialization })(App)