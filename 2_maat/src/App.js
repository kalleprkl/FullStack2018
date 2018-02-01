import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value })
  }

  render() {

    const show = this.state.countries.filter(country => {
      return country.name.toLowerCase().includes(this.state.search.toLowerCase())
    })

    if (this.state.countries.length > 0) {
      console.log(this.state.countries[0].name)
    }

    return (
      <div>
        <p>find countries</p>
        <input value={this.state.search} onChange={this.handleSearch} />
        <Display show={show} />
      </div>
    );
  }
}

const Display = ({ show }) => {
  if (show.length > 0) {
    if (show.length > 10) {
      return <p>too many results</p>
    } else if (show.length === 1) {
      return <Country data={show[0]}/>
    } else {
      return (
        <div>
          {show.map(country => <p key={country.alpha2Code}>{country.name}</p>)}
        </div>
      )
    }
  } else {
    return <p>no data</p>
  }
}

const Country = ({ data }) => {
  return (
    <div>
      <h1>{data.name} {data.nativeName}</h1>
      <p>capital: {data.capital}</p>
      <p>population: {data.population}</p>
      <img src={data.flag} width="30%" height="30%"/>
    </div>
  )
}

export default App;
