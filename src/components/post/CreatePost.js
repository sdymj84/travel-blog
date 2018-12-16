import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Form, Col, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const StyledHome = styled.div`
  margin-top: 3em;

  h1 {
    margin-bottom: 1em;
  }

  hr {
    margin: 2em;
  }

  div.ql-container {
  }
`

export class CreatePost extends Component {

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  render() {
    return (
      <StyledHome>
        <Container>
          <h1>Create new post</h1>
          <Form>
            <Form.Group as={Row} controlId="title">
              <Col sm={10}>
                <Form.Control type="text" placeholder="Title" />
              </Col>
            </Form.Group>
            <hr />
            <ReactQuill theme='snow' modules={this.modules}
              formats={this.formats}></ReactQuill>
          </Form>
        </Container>
      </StyledHome>
    )
  }
}

export default CreatePost
