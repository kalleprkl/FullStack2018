import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>
            {props.kurssi}
        </h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.o1} tehtavia={props.t1} />
            <Osa osa={props.o2} tehtavia={props.t2} />
            <Osa osa={props.o3} tehtavia={props.t3} />
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa} {props.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.t1 + props.t2 + props.t3} tehtävää</p>
    )
}

const App = () => {

    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto
                o1={osa1.nimi} t1={osa1.tehtavia}
                o2={osa2.nimi} t2={osa2.tehtavia}
                o3={osa3.nimi} t3={osa3.tehtavia}
            />
            <Yhteensa
                t1={osa1.tehtavia}
                t2={osa2.tehtavia}
                t3={osa3.tehtavia}
            />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)