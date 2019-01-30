import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Dropzone from 'react-dropzone'
import CountryDropdown from './CountryDropdown'
import { connect } from "react-redux";
import { createPost } from '../../actions/postActions'
import { Redirect } from 'react-router-dom'

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
  display: table;
  width: 100%;
  height: 100px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: ${props => props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
  background-color: ${props => props.isDragReject || props.isDragActive ? '#eee' : ''};
  text-align: center;

  span {
    display: table-cell;
    vertical-align: middle;
  }

  .oi-plus {
    width: 1em;
    height: 1em;
    margin-right: 5px;
  }
`

export class CreatePost extends Component {

  state = {
    country: "",
    title: "",
    summary: "",
    content: "",
  }

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

  handleCountryChange = (country) => {
    this.setState({ country })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleQuillChange = (value) => {
    this.setState({
      content: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createPost(this.state)
  }

  render() {
    const uid = this.props.uid
    if (!uid) {
      return <Redirect to='/' />
    }

    return (
      <StyledContainer>
        <Container>
          <h1>Create new post</h1>
          <Form onSubmit={this.handleSubmit}>

            <CountryDropdown onChange={this.handleCountryChange} />

            <Form.Group as={Row} controlId="title">
              <Col sm={10}>
                <Form.Control type="text" placeholder="Title" onChange={this.handleChange} required />
              </Col>
            </Form.Group>
            <hr />

            <Form.Group as={Row} controlId="summary">
              <Col sm={10}>
                <Form.Control type="text" placeholder="Summary" onChange={this.handleChange} required />
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
                        <span><img src="/open-iconic/svg/plus.svg" alt="plus" className="oi-plus" />
                          {isDragAccept ? 'Drop' : 'Drag'} Main Image file here...</span>
                      </StyledDropzone>
                    )
                  }}
                </Dropzone>
              </Col>
            </Form.Group>
            <ReactQuill theme='snow'
              modules={this.modules}
              formats={this.formats}
              placeholder='Write content..'
              value={this.state.content}
              onChange={this.handleQuillChange}
              required >
            </ReactQuill>
            <hr />
            <Form.Group as={Row} controlId="title">
              <Col sm={{ span: 2 }}>
                <Button as="input" type="submit" value="Submit" block />
              </Col>
            </Form.Group>

          </Form>
        </Container>
      </StyledContainer >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)

