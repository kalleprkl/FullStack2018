import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            yht: 0
        }
    }

    setHyva = () => {
        this.setState({ hyva: this.state.hyva + 1, yht: this.state.yht + 1 })
    }

    setNeutraali = () => {
        this.setState({ neutraali: this.state.neutraali + 1, yht: this.state.yht + 1 })
    }

    setHuono = () => {
        this.setState({ huono: this.state.huono + 1, yht: this.state.yht + 1 })
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
                <p>keskiarvo {this.state.yht > 0 ? (this.state.hyva  - this.state.huono) / this.state.yht : 0}</p>
                <p>positiivisia {this.state.yht > 0 ? this.state.hyva / this.state.yht * 100 : 0}% </p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)