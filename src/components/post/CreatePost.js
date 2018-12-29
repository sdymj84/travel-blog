import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Form, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Dropzone from 'react-dropzone'

const StyledContainer = styled.div`
  margin-top: 3em;

  h1 {
    margin-bottom: 1em;
  }

  hr {
    margin: 2em;
  }

  .dropdown {
    margin-bottom: 1em;
  }
`

const getColor = (props) => {
  if (props.isDragReject) {
    return '#c66';
  }
  if (props.isDragActive) {
    return '#6c6';
  }
  return '#666';
};

const StyledDropzone = styled.div`
  width: 100%;
  height: 100px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: ${props => props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
  background-color: ${props => props.isDragReject || props.isDragActive ? '#eee' : ''};
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
      <StyledContainer>
        <Container>
          <h1>Create new post</h1>
          <Form>

            <DropdownButton title="Select Country">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>

            <Form.Group as={Row} controlId="title">
              <Col sm={10}>
                <Form.Control type="text" placeholder="Title" />
              </Col>
            </Form.Group>
            <hr />

            <Form.Group as={Row}>
              <Col sm={10}>
                <Dropzone accept="image/*">
                  {({ getRootProps, isDragActive, isDragAccept, isDragReject, acceptedFiles }) => {
                    return (
                      <StyledDropzone
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                        {...getRootProps()}
                      >
                        {isDragAccept ? 'Drop' : 'Drag'} files here...
                  </StyledDropzone>
                    )
                  }}
                </Dropzone>
              </Col>
            </Form.Group>
            <ReactQuill theme='snow'
              modules={this.modules}
              formats={this.formats}
              placeholder='Write content..'>
            </ReactQuill>
          </Form>
        </Container>
      </StyledContainer >
    )
  }
}

export default CreatePost
