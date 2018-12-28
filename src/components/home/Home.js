import React, { Component } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { Container, Image, Card, Row, Col } from 'react-bootstrap'
import SvgComponent from './SvgComponent'

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
        <div className='jumbo'>
          {/* <StyledWorldMap src="img/worldmap.jpg" useMap="#image-map" fluid /> */}
          <StyledWorldMap />
        </div>
        <Container>
          <Row>

            <Col sm={6} lg={4}>
              <StyledLink to="/post/south-korea">
                <Card>
                  <Card.Img variant="top" src="img/south-korea.jpg" />
                  <Card.Body>
                    <Card.Title>South Korea</Card.Title>
                    <Card.Text>
                      My Home
                </Card.Text>
                  </Card.Body>
                </Card>
              </StyledLink>
            </Col>

            <Col sm={6} lg={4}>
              <StyledLink to="post/autralia">
                <Card>
                  <Card.Img variant="top" src="img/australia.jpg" />
                  <Card.Body>
                    <Card.Title>Australia</Card.Title>
                    <Card.Text>
                      Been there for 1y 6m
                </Card.Text>
                  </Card.Body>
                </Card>
              </StyledLink>
            </Col>

            <Col sm={6} lg={4}>
              <StyledLink to="/post/usa">
                <Card>
                  <Card.Img variant="top" src="img/usa.jpg" />
                  <Card.Body>
                    <Card.Title>United States</Card.Title>
                    <Card.Text>
                      My second home
                </Card.Text>
                  </Card.Body>
                </Card>
              </StyledLink>
            </Col>

          </Row>
        </Container>
      </StyledContainer >
    )
  }
}

export default Home
