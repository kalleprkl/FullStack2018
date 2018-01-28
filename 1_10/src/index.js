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

    handleClick = (name) => {

        return () => {
            const newState = {}
            newState[name] = this.state[name] + 1
            newState['yht'] = this.state.yht + 1
            this.setState(newState)
        }
    }

    /*setHyva = () => {
        this.setState({ hyva: this.state.hyva + 1, yht: this.state.yht + 1 })
    }

    setNeutraali = () => {
        this.setState({ neutraali: this.state.neutraali + 1, yht: this.state.yht + 1 })
    }

    setHuono = () => {
        this.setState({ huono: this.state.huono + 1, yht: this.state.yht + 1 })
    }*/

    render() {
        console.log('render')
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button name="hyvä" onClick={this.handleClick("hyva")} />
                <Button name="neutraali" onClick={this.handleClick("neutraali")} />
                <Button name="huono" onClick={this.handleClick("huono")} />
                <h1>statistiikka</h1>
                <Statistics
                    hyva={this.state.hyva}
                    neutraali={this.state.neutraali}
                    huono={this.state.huono}
                    yht={this.state.yht}
                />
            </div>
        )
    }
}

const Button = ({ name, onClick }) => (
    <button onClick={onClick}>{name}</button>
)

const Statistics = ({ hyva, neutraali, huono, yht }) => {
    if (yht > 0) {
        return (
            <div>
                <Statistic text="hyvä" data={hyva} />
                <Statistic text="neutraali" data={neutraali} />
                <Statistic text="huono" data={huono} />
                <Statistic text="keskiarvo" data={yht > 0 ? (hyva - huono) / yht : 0} />
                <Statistic text="positiivisia" data={yht > 0 ? hyva / yht * 100 : 0} extra="%" />
            </div>
        )
    } else {
        return <p>ei yhtään palautetta annettu</p>
    }
}

const Statistic = ({ text, data, extra }) => (
    <p>{text} {data}{extra}</p>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)