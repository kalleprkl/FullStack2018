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
            <p>{props.o1} {props.t1}</p>
            <p>{props.o2} {props.t2}</p>
            <p>{props.o3} {props.t3}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.t1 + props.t2 + props.t3} tehtävää</p>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto
                o1={osa1} t1={tehtavia1}
                o2={osa2} t2={tehtavia2}
                o3={osa3} t3={tehtavia3}
            />
            <Yhteensa t1={tehtavia1} t2={tehtavia2} t3={tehtavia3} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)