import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Sisalto = (props) => {
    
    return (
        <div>
            {props.kurssi.osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

const Yhteensa = ({ kurssi }) => {
    return (<p>{kurssi.osat.reduce((sum, osa) => {return sum + osa.tehtavia}, 0)}</p>)
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)