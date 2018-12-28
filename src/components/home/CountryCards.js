import React from 'react'
import { Link } from "react-router-dom";
import { Card, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'


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


const CountryCards = (props) => {
  return (
    <Row>
      <Col sm={6} lg={4}>
        <StyledLink to="/post/south-korea">
          <Card className="asia">
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
  )
}

export default CountryCards
