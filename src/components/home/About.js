import React, { Component } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const HomeStyle = styled.div`
  margin-top: 3em;
`

export class Home extends Component {
  render() {
    return (
      <HomeStyle>
        <Container>
          <h1>About</h1>
        </Container>
      </HomeStyle>
    )
  }
}

export default Home
