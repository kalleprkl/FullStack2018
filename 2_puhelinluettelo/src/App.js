import React from 'react';

const data = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
]

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: data,
            toDisplay: data,
            newName: '',
            newNumber: ''
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

    search = (event) => {
        const results = this.state.persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        this.setState({ toDisplay: results })
    }

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <div>
                    rajaa näytettäviä 
                    <input onChange={this.search} />
                </div>
                <h2>Lisää uusi</h2>
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
                <h1>Numerot</h1>
                <table>
                    <tbody>
                        {this.state.toDisplay.map(person =>
                            <tr key={person.name}>
                                <td>{person.name}</td>
                                <td>{person.number}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App