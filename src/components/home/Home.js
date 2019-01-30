import React, { Component } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import SvgComponent from './SvgComponent'
import CountryCards from './CountryCards'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const StyledContainer = styled.div`
  .container {
    margin-top: 3em;
  }

  .jumbo {
    background-color: #F5F5F5;
  }

  .card {
    margin-bottom: 2em;
  }

`

const StyledWorldMap = styled(SvgComponent)`
  @media (min-width: 1200px) {
    width: 1200px;
    display: block;
    margin: 0 auto;
  }

  #africa g {
    fill: #53676c;
    transition: fill 0.4s ease;
    -webkit-transition: fill 0.4s ease;
    fill-opacity: 0.8;
    transition: fill-opacity 0.4s ease;
    -webkit-transition: fill-opacity 0.4s ease;
  }
  #africa g:hover {
    fill: #394d51;
    fill-opacity: 1;
  }

  #asia g {
    fill: #FE9856;
    transition: fill 0.4s ease;
    -webkit-transition: fill 0.4s ease;
    fill-opacity: 0.8;
    transition: fill-opacity 0.4s ease;
    -webkit-transition: fill-opacity 0.4s ease;
  }
  #asia g:hover {
    fill: #e06a21;
    fill-opacity: 1;
  }

  #oceania g {
    fill: #00aad4;
    transition: fill 0.4s ease;
    -webkit-transition: fill 0.4s ease;
    fill-opacity: 0.8;
    transition: fill-opacity 0.4s ease;
    -webkit-transition: fill-opacity 0.4s ease;
  }
  #oceania g:hover {
    fill: #027791;
    fill-opacity: 1;
  }

  #south-america g {
    fill: #00A910;
    transition: fill 0.4s ease;
    -webkit-transition: fill 0.4s ease;
    fill-opacity: 0.8;
    transition: fill-opacity 0.4s ease;
    -webkit-transition: fill-opacity 0.4s ease;
  }
  #south-america g:hover {
    fill: #01720a;
    fill-opacity: 1;
  }

  #europe g {
    fill: #c83771;
    transition: fill 0.4s ease;
    -webkit-transition: fill 0.4s ease;
    fill-opacity: 0.8;
    transition: fill-opacity 0.4s ease;
    -webkit-transition: fill-opacity 0.4s ease;
  }
  #europe g:hover {
    fill: #871f46;
    fill-opacity: 1;
  }

  #north-america g {
    fill: #FECB17;
    transition: fill 0.4s ease;
    -webkit-transition: fill 0.4s ease;
    fill-opacity: 0.8;
    transition: fill-opacity 0.4s ease;
    -webkit-transition: fill-opacity 0.4s ease;
  }
  #north-america g:hover {
    fill: #d1a002;
    fill-opacity: 1;
  }
  
`

export class Home extends Component {

  ref = React.createRef();

  scrollToRef = () => {
    window.scrollTo({
      top: this.ref.current.offsetTop - 30,
      behavior: "smooth"
    })
  }

  handleClick = () => {
    this.scrollToRef()
  }

  render() {
    const { countries } = this.props
    return (
      <StyledContainer>
        <div className='jumbo'>
          <StyledWorldMap handleClick={this.handleClick} />
        </div>
        <Container>
          <div ref={this.ref}></div>
          <CountryCards countries={countries} />
        </Container>
      </StyledContainer >
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
  firestoreConnect(['countries'])
)(Home)



