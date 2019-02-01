import React, { Component } from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  width: 200px;
  margin-bottom: 1em;
`

export class CountryDropdown extends Component {
  state = {
    selectedCountry: ""
  }

  handleChange = (e) => {
    this.setState({ selectedCountry: e.target.value })
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <StyledSelect className="btn btn-info"
        value={this.state.selectedCountry}
        onChange={this.handleChange}
        required>
        <option value="">Select Country</option>
        <option value="South Korea">South Korea</option>
        <option value="Australia">Australia</option>
        <option value="United States">United States</option>
      </StyledSelect>
    )
  }
}

export default CountryDropdown
