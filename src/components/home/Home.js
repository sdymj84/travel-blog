import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Image, Card, Row, Col } from 'react-bootstrap'

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
          <Row>

            <Col sm={6} lg={4}>
              <Card>
                <Card.Img variant="top" src="img/south-korea.jpg" />
                <Card.Body>
                  <Card.Title>South Korea</Card.Title>
                  <Card.Text>
                    My Home
                </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} lg={4}>
              <Card>
                <Card.Img variant="top" src="img/australia.jpg" />
                <Card.Body>
                  <Card.Title>Australia</Card.Title>
                  <Card.Text>
                    Been there for 1y 6m
                </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} lg={4}>
              <Card>
                <Card.Img variant="top" src="img/usa.jpg" />
                <Card.Body>
                  <Card.Title>United States</Card.Title>
                  <Card.Text>
                    My second home
                </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </StyledContainer>
    )
  }
}

export default Home
