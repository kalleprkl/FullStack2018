import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    addName = (event) => {
        event.preventDefault()
        const person = { name: this.state.newName }
        const checkName = this.state.persons.filter(person => person.name === this.state.newName)
        if (checkName.length === 0) {
            const persons = this.state.persons.concat(person)
            this.setState({
                persons,
                newName: ''
            })
        } else {
            alert('nimi on jo luettelossa')
        }

    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    {this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default App