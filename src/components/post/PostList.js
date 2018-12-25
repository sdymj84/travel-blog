import React, { Component } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { Container, Card, Row, Col } from 'react-bootstrap'

const StyledContainer = styled.div`
  .container {
    margin-top: 3em;
  }

  .card {
    margin-bottom: 2em;
  }

`

const StyledLink = styled(Link)`
  .card {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: box-shadow, transform;
    transition-property: box-shadow, transform;
  }

  .card:hover, .card:focus, .card:active {
    text-decoration: none;
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
    box-shadow: 1px 1px 20px grey;
  }

`


export class Home extends Component {
  render() {
    return (
      <StyledContainer>
        <Container>
          <Row>


            <Col sm={6} lg={4}>
              <StyledLink to='/post/south-korea/1'>
                <Card>
                  <Card.Img variant="top" src="https://place-hold.it/350x200" />
                  <Card.Body>
                    <Card.Title>Seoul 3 days trip</Card.Title>
                    <Card.Text>
                      Eat Eat and Eat!!!
                </Card.Text>
                  </Card.Body>
                </Card>
              </StyledLink>
            </Col>


            <Col sm={6} lg={4}>
              <StyledLink to='/post/south-korea/2'>
                <Card>
                  <Card.Img variant="top" src="https://place-hold.it/350x200" />
                  <Card.Body>
                    <Card.Title>Korean Palace tour</Card.Title>
                    <Card.Text>
                      Experience Chosun era
                </Card.Text>
                  </Card.Body>
                </Card>
              </StyledLink>
            </Col>

            <Col sm={6} lg={4}>
              <StyledLink to='/post/south-korea/3'>
                <Card>
                  <Card.Img variant="top" src="https://place-hold.it/350x200" />
                  <Card.Body>
                    <Card.Title>Jeju Island 2 days trip</Card.Title>
                    <Card.Text>
                      Beautiful and peaceful island
                </Card.Text>
                  </Card.Body>
                </Card>
              </StyledLink>
            </Col>

          </Row>
        </Container>
      </StyledContainer>
    )
  }
}

export default Home
