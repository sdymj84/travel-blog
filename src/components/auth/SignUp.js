import React from 'react'
import styled from 'styled-components'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'


const StyledContainer = styled.div`
  margin-top: 3em;

  h1 {
    margin-bottom: 1em;
  }

  hr {
    margin: 2em;
  }
`


const SignUp = () => {
  return (
    <StyledContainer>
      <Container>
        <h1>Sign Up</h1>

        <Form>
          <Form.Group as={Row} controlId="formHorizontalFirstName">
            <Form.Label column sm={2}>Name</Form.Label>
            <Col sm={5} md={4} lg={3}>
              <Form.Control type="text" placeholder="First name" />
            </Col>
            <Col sm={5} md={4} lg={3}>
              <Form.Control type="text" placeholder="Last name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>Email (Username)</Form.Label>
            <Col sm={10} md={8} lg={6}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>Password</Form.Label>
            <Col sm={10} md={8} lg={6}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign Up</Button>
            </Col>
          </Form.Group>
        </Form>

      </Container>
    </StyledContainer>

  )
}

export default SignUp
