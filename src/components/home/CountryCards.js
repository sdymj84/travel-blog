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
  const countries = props.countries
  return (
    <Row>
      {countries && countries.map(country => {
        return (
          <Col sm={6} lg={4} key={country.id}>
            <StyledLink to="/post/south-korea">
              <Card className={country.continent}>
                <Card.Img variant="top" src={country.photoUrl} />
                <Card.Body>
                  <Card.Title>{country.countryName}</Card.Title>
                  <Card.Text>
                    {country.summary}
                  </Card.Text>
                </Card.Body>
              </Card>
            </StyledLink>
          </Col>
        )
      })}
    </Row>
  )
}

export default CountryCards
