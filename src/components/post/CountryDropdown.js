import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

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
    const { countries } = this.props
    return (
      <StyledSelect className="btn btn-info"
        value={this.props.selectedCountry || this.state.selectedCountry}
        onChange={this.handleChange}
        required>
        <option value="">Select Country</option>
        {countries && countries.map(country => {
          const name = country.countryName
          return (
            <option key={country.id} value={name}>{name}</option>
          )
        })}
      </StyledSelect>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    countries: state.firestore.ordered.countries
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'countries',
    orderBy: 'countryName'
  }])
)(CountryDropdown)
