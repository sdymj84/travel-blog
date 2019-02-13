import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";

const StyledSelect = styled.select`
  width: 200px;
  margin-bottom: 1em;
`

export class CountryDataDropdown extends Component {
  state = {
    selectedCountry: "",
  }

  handleChange = (e) => {
    this.setState({ selectedCountry: e.target.value })
    this.props.handleCountryChange(e.target.value)
  }

  render() {
    const { countries } = this.props
    return (
      <StyledSelect className="btn btn-info"
        value={this.props.selectedCountry || this.state.selectedCountry}
        onChange={this.handleChange}
        required>
        <option value="">Select Country</option>
        {countries && countries.map(country => {
          const name = country.name
          return (
            <option key={country.alpha2Code} value={name}>{name}</option>
          )
        })}
      </StyledSelect>
    )
  }
}

const mapStateToProps = (state) => {
  const countries = state.post.countries
  return { countries }
}

export default connect(mapStateToProps)(CountryDataDropdown)