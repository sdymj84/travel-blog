import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import CountryDropdown from './CountryDropdown'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { createPost } from '../../actions/postActions'
import { Redirect } from 'react-router-dom'
import CreateCountry from './CreateCountry';
import TextEditor from './TextEditor';
import { TiPlus } from "react-icons/ti";
import Loader from '../layout/Loader'

const StyledContainer = styled.div`
  margin-top: 3em;

  h1, .dropdown, .btn-new-country {
    margin-bottom: 1em;
  }

  .btn-new-country {
    margin-left: 1em;
  }

  hr {
    margin: 2em;
  }

  .form-control-file {
    margin-top: 5px;
  }

  @media (min-width: 576px) {
    #main-img-label {
      margin-right: -3em;
    }
  }

  #main-image {
    border: 1px solid #CED4DA;
    border-radius: 4px;
    margin: 0;
  }

  #btn-upload {
    padding-right: 0;
  }

  button svg {
    position: relative;
    top: 3px;
    font-size: 1.1em;
  }

  .add-image {
    border-style: dashed;
    border-width: 2px;
    font-size: 2em;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    
    @media (max-width: 576px) {
      margin: 0 15px;
      height: 3em;
    }
    
    :hover {
      background-color: #c7dadd;
    }
    :active {
      position: relative;
      top: 1px;
    }
  }
  .add-image_btn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .add-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    button {
      width: 2.2em;
      margin-bottom: 5px;
      
      @media (max-width: 576px) {
        margin: 0 3px;
      }
    }

    @media (max-width: 576px) {
      margin: 5px;
      flex-direction: row;
    }
  }

`


export class EditPost extends Component {

  state = {
    country: "",
    title: "",
    summary: "",
    contentRow: 1,
    contents: [
      {
        image: "",
        body: ""
      }
    ],
    selectedFile: "",
  }

  handleCountryChange = (country) => {
    this.setState({ country })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleQuillChange = (value, i) => {
    const { contents } = this.state
    contents[0].body = value
    this.setState({ contents })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createPost(this.state)
  }

  handleSelectedFile = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  handleAddRowClick = (i) => {
    const contents = this.state.contents
    contents.splice(i + 1, 0, {
      image: "",
      thumbnail: "",
      body: ""
    })
    this.setState({
      contents,
      contentRow: this.state.contentRow + 1
    })
  }

  handleRemoveRowClick = (i) => {
    const contents = this.state.contents
    contents.splice(i, 1)
    this.setState({
      contents,
      contentRow: this.state.contentRow - 1
    })
  }

  handleContentImage = (e, i) => {
    const file = e.target.files[0]
    // error occur without condition 
    // because when cancel file window -> URL.createObjectURL(null)
    if (file) {
      const contents = this.state.contents
      contents[i].image = e.target.files[0]
      contents[i].thumbnail = URL.createObjectURL(e.target.files[0])
      this.setState({ contents })
    }
  }

  /* UNSAFE_componentWillMount = () => {
    console.log('componentWillMount')
    const { post } = this.props
    if (post) this.setState({ ...post })
  } */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { post } = nextProps
    console.log(post.contents)

    if (post) {
      this.setState({ ...post })
    }
  }

  render() {
    const uid = this.props.uid
    if (!uid) {
      return <Redirect to='/' />
    }
    const { post } = this.props
    if (!post) {
      return <Loader />
    }

    console.log(this.state)

    // save all contentRows in array and show
    const contentRow = () => {
      const len = this.state.contentRow
      let output = []
      for (let i = 0; i < len; i++) {
        output.push(
          <Form.Group as={Row} key={i}>
            <Col sm={4} className='add-image'
              style={this.state.contents[i].thumbnail ?
                { backgroundImage: `url(${this.state.contents[i].thumbnail})` }
                : {}}>
              <Form.Label className="add-image_btn">
                <TiPlus />
                <Form.Control type='file'
                  onChange={(e) => this.handleContentImage(e, i)}
                  hidden />
              </Form.Label>
            </Col>
            <Col sm={7}>
              <TextEditor
                handleQuillChange={(value) => this.handleQuillChange(value, i)}
                content={this.state.contents[i].body} />
            </Col>
            <Col sm={1} className="add-row">
              {len !== 1 ?
                <Button variant="danger"
                  onClick={() => this.handleRemoveRowClick(i)}>-</Button>
                : null}
              <Button onClick={() => this.handleAddRowClick(i)}>+</Button>
            </Col>
          </Form.Group>
        )
      }
      return output
    }

    return (
      <StyledContainer>
        <Container>
          <h1>Edit post</h1>
          <CreateCountry history={this.props.history} />
          <Form onSubmit={this.handleSubmit}>
            <CountryDropdown
              selectedCountry={this.state.country}
              onChange={this.handleCountryChange} />

            <Form.Group as={Row} controlId="title">
              <Col sm={10}>
                <Form.Control type="text" placeholder="Title"
                  value={this.state.title} onChange={this.handleChange} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="summary">
              <Col sm={10}>
                <Form.Control type="text" placeholder="Summary"
                  value={this.state.summary} onChange={this.handleChange} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="main-image">
              <Form.Label column sm={4} md={3} lg={2} id="main-img-label">
                Main Image :
              </Form.Label>
              <Col>
                <Form.Control type='file' onChange={this.handleSelectedFile} />
              </Col>
            </Form.Group>
            <hr />
            {contentRow()}
          </Form>
        </Container>
      </StyledContainer >
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.post_id
  const posts = state.firestore.data.posts
  const post = posts ? posts[id] : null
  const uid = state.firebase.auth.uid
  return {
    post, uid
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPost: (post) => dispatch(createPost(post, ownProps.history)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['posts']),
)(EditPost)

