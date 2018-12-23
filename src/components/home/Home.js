import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Image, CardColumns, Card } from 'react-bootstrap'

const StyledContainer = styled.div`
  .container {
    margin-top: 3em;
  }

  .jumbo {
    background-color: #F5F5F5;
  }

  .card-columns {
    display: inline-block;
  }

  @media (min-width: 576px) {
    .card-columns {
      column-count: 2;
    }
  }
  @media (min-width: 768px) {
    .card-columns {
      column-count: 3;
    }
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
          <CardColumns>

            <Card>
              <Card.Img variant="top" src="img/south-korea.jpg" />
              <Card.Body>
                <Card.Title>South Korea</Card.Title>
                <Card.Text>
                  My Home
                </Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src="img/australia.jpg" />
              <Card.Body>
                <Card.Title>Australia</Card.Title>
                <Card.Text>
                  Been there for 1y 6m
                </Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src="img/usa.jpg" />
              <Card.Body>
                <Card.Title>United States</Card.Title>
                <Card.Text>
                  My second home
                </Card.Text>
              </Card.Body>
            </Card>


          </CardColumns>
        </Container>
      </StyledContainer>
    )
  }
}

export default Home
