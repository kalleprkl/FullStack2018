import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: anecdotes.map(() => 0),
            top: -1
        }
    }

    nextAnecdote = () => {
        let random = Math.floor(Math.random() * anecdotes.length)
        while (random === this.state.selected) {
            random = Math.floor(Math.random() * anecdotes.length)
        }
        this.setState({ selected: random })
    }

    voteAnecdote = () => {
        const votes = this.state.votes 
        votes[this.state.selected] = votes[this.state.selected] + 1
        let top = this.state.top
        if (votes[this.state.selected] > votes[top] || top === -1) {
            top = this.state.selected
        }
        this.setState({ votes: votes, top: top })
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>has {this.state.votes[this.state.selected]} votes</p>
                <Button label='vote' onClick={this.voteAnecdote} />
                <Button label='next' onClick={this.nextAnecdote} />
                <h1>anecdote with most votes</h1>
                <p>{this.state.top === -1 ? '' : anecdotes[this.state.top]}</p>
                <p>{this.state.top === -1 ? '' : 'has ' + this.state.votes[this.state.top] + ' votes'}</p>
            </div>
        )
    }
}

const Button = ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)