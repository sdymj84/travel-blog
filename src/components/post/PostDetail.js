import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Jumbotron, Image } from 'react-bootstrap'

const StyledContainer = styled.div`
  .container {
    margin-top: 3em;
  }

  .container-fluid {
    padding: 0;
  }

`

export class Home extends Component {
  render() {
    return (
      <StyledContainer>
        <Container fluid>
          <Image src="https://place-hold.it/1900x500" fluid></Image>
        </Container>
        <Container>
          <h1>Seoul 3 days trip</h1>
          <hr />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat et consequuntur repellat molestiae vitae quibusdam eum sapiente dolore at impedit, asperiores sunt repellendus a, voluptates porro quidem, suscipit quia. Dolore.</p>
        </Container>
      </StyledContainer>
    )
  }
}

export default Home
