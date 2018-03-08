import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { connect } from 'react-redux'

class App extends React.Component {

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

export default connect(mapStateToProps)(App)