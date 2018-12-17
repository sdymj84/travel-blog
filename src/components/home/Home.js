import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Image } from 'react-bootstrap'

const StyledContainer = styled.div`
  .container {
    margin-top: 3em;
  }

  .jumbo {
    background-color: #F5F5F5;
  }
`

const StyledWorldMap = styled(Image)`
  @media (min-width: 1200px) {
    width: 1200px;
    display: block;
    margin: 0 auto;
  }
  
`

export class Home extends Component {
  render() {
    return (
      <StyledContainer>
        <div className='jumbo'>
          <StyledWorldMap src="img/worldmap.jpg" fluid />
        </div>
        <Container>
          <h1>Home</h1>
        </Container>
      </StyledContainer>
    )
  }
}

export default Home
