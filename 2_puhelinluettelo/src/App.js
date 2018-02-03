import React from 'react';
import personService from './services/persons'

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

    componentWillMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({
                    persons: response,
                    toDisplay: response
                })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const person = { name: this.state.newName, number: this.state.newNumber }
        const checkName = this.state.persons.find(person => person.name === this.state.newName)
        if (checkName === undefined) {
            personService
                .create(person)
                .then(newPerson => {
                    const persons = this.state.persons.concat(newPerson)
                    this.setState({
                        persons,
                        toDisplay: persons,
                        newName: '',
                        newNumber: ''
                    })
                })
            /*axios
                .post('http://localhost:3001/persons', person)
                .then(response => {
                    const persons = this.state.persons.concat(response.data)
                    this.setState({
                        persons,
                        toDisplay: persons,
                        newName: '',
                        newNumber: ''
                    })
                })*/
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

    remove = (person) => {
        return () => {
            if (window.confirm('poistetaanko ' + person.name + '?')) {
                personService.destroy(person.id)
                const indexToRemove = this.state.persons.indexOf(person)
                const persons = this.state.persons.slice()
                persons.splice(indexToRemove, 1)
                this.setState({
                    persons,
                    toDisplay: persons
                })
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Search onChange={this.search} />
                <h2>Lisää uusi</h2>
                <Add
                    onSubmit={this.addPerson}
                    newName={this.state.newName}
                    newNumber={this.state.newNumber}
                    onNameChange={this.handleNameChange}
                    onNumberChange={this.handleNumberChange}
                />

                <h1>Numerot</h1>
                <Display toDisplay={this.state.toDisplay} remove={this.remove} />
            </div>
        )
    }
}

const Search = ({ onChange }) => {
    return (
        <div>
            rajaa näytettäviä
            <input onChange={onChange} />
        </div>
    )
}

const Add = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <Input text='nimi' value={props.newName} onChange={props.onNameChange} />
            <Input text='numero' value={props.newNumber} onChange={props.onNumberChange} />
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const Input = (props) => {
    return (
        <div>
            {props.text}: <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

const Display = ({ toDisplay, remove }) => {
    return (
        <table>
            <tbody>
                {toDisplay.map(person =>
                    <Row key={person.name} person={person} remove={remove(person)} />
                )}
            </tbody>
        </table>
    )
}

const Row = ({ person, remove }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={remove}>remove</button></td>
        </tr>
    )
}

export default App