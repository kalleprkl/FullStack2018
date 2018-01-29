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

    addPerson = (event) => {
        event.preventDefault()
        const person = { name: this.state.newName, number: this.state.newNumber }
        const checkName = this.state.persons.filter(person => person.name === this.state.newName)
        if (checkName.length === 0) {
            const persons = this.state.persons.concat(person)
            this.setState({
                persons,
                newName: '',
                newNumber: ''
            })
        } else {
            alert('nimi on jo luettelossa')
        }

    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    {this.state.persons.map(person =>
                        <tr key={person.name}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                        </tr>)}
                </table>
            </div>
        )
    }
}

export default App