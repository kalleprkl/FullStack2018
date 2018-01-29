import React from 'react'

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
    return (<p>yhteensä {kurssi.osat.reduce((sum, osa) => { return sum + osa.tehtavia }, 0)} tehtävää</p>)
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

export default Kurssi