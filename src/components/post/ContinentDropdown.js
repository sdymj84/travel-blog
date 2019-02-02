import React, { Component } from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  width: 200px;
  margin-bottom: 1em;
`

export class CountryDropdown extends Component {
  state = {
    selectedContinent: ""
  }

  handleChange = (e) => {
    this.setState({ selectedContinent: e.target.value })
    this.props.handleContinentChange(e.target.value)
  }

  render() {
    return (
      <StyledSelect className="btn btn-info"
        value={this.state.selectedContinent}
        onChange={this.handleChange}
        required>
        <option value="">Select Continent</option>
        <option value="Asia">Asia</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
      </StyledSelect>
    )
  }
}

export default CountryDropdown
