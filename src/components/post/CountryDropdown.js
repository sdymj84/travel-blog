import React from 'react'
import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

const StyledSelect = styled.select`
  width: 200px;
  margin-bottom: 1em;
`

const handleSelect = (e) => {
  console.log(e.target.options[e.target.selectedIndex].text)
}

const CountryDropdown = () => {
  return (
    <StyledSelect className="btn btn-info">
      <option>Select Country</option>
      <option>South Korea</option>
      <option>Autralia</option>
      <option>United States</option>
    </StyledSelect>
  )
}

export default CountryDropdown
