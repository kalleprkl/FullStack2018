import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    setHyva = () => {
        this.setState({ hyva: this.state.hyva + 1 })
    }

    setNeutraali = () => {
        this.setState({ neutraali: this.state.neutraali + 1 })
    }

    setHuono = () => {
        this.setState({ huono: this.state.huono + 1 })
    }

    render() {

        const Button = ({name, onClick}) => (
            <button onClick={onClick}>{name}</button>
        )

        return (
            <div>
                <h1>anna palautetta</h1>
                <Button name="hyvä" onClick={this.setHyva} />
                <Button name="neutraali" onClick={this.setNeutraali} />
                <Button name="huono" onClick={this.setHuono} />
                <h1>statistiikka</h1>
                <p>hyvä {this.state.hyva}</p>
                <p>neutraali {this.state.neutraali}</p>
                <p>huono {this.state.huono}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)