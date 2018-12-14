import React, { Component } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const StyledHome = styled.div`
  margin-top: 3em;
`

export class Home extends Component {
  render() {
    return (
      <StyledHome>
        <Container>
          <h1>Home</h1>
        </Container>
      </StyledHome>
    )
  }
}

export default Home
