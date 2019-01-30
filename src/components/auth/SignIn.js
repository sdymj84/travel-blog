import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Form, Col, Row, Button, Alert } from 'react-bootstrap'
import { connect } from "react-redux";
import { signIn } from '../../actions/authActions'
import { Redirect } from 'react-router-dom'


const StyledContainer = styled.div`
  margin-top: 3em;

  h1 {
    margin-bottom: 1em;
  }

  hr {
    margin: 2em;
  }
`

export class SignIn extends Component {

  state = {
    email: "",
    password: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signIn(this.state)
  }

  render() {
    const { authError, uid } = this.props
    if (uid) {
      return <Redirect to='/' />
    }

    return (
      <StyledContainer>
        <Container>
          <h1>Sign In</h1>
          {
            authError ?
              <Alert variant="danger">{authError}</Alert>
              : null
          }

          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="email">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} md={8} lg={6}>
                <Form.Control type="email" placeholder="Email" onChange={this.handleChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="password">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10} md={8} lg={6}>
                <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalCheck">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check label="Remember me" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 1, offset: 2 }}>
                <Button type="submit">Sign In</Button>
              </Col>
            </Form.Group>
          </Form>

        </Container>
      </StyledContainer>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    uid: state.firebase.auth.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
