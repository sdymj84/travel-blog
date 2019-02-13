import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledSelect = styled.select`
  width: 200px;
  margin-bottom: 1em;
`

export class CountryDataDropdown extends Component {
  state = {
    selectedCountry: "",
    countries: "",
  }

  componentDidMount = () => {
    // const { continent } = this.props
    axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {
        console.log(res)
        const countries = res.data
        this.setState({ countries })
      })
  }

  handleChange = (e) => {
    this.setState({ selectedCountry: e.target.value })
    this.props.handleCountryChange(e.target.value)
  }

  render() {
    const { countries } = this.state
    return (
      <StyledSelect className="btn btn-info"
        value={this.props.selectedCountry || this.state.selectedCountry}
        onChange={this.handleChange}
        required>
        <option value="">Select Country</option>
        {countries && countries.map(country => {
          const name = country.name
          console.log(name)
          return (
            <option key={country.alpha2Code} value={name}>{name}</option>
          )
        })}
      </StyledSelect>
    )
  }
}

export default CountryDataDropdown