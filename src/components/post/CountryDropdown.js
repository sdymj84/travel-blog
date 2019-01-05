import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  width: 200px;
  margin-bottom: 1em;
`

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
