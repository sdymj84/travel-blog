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
import { TiPlus } from "react-icons/ti";

const StyledContainer = styled.div`
  margin-top: 3em;


`


export class CreateCountry extends Component {

  state = {
    country: "",
    title: "",
    summary: "",
    content: "",
    selectedFile: "",
  }


  render() {
    const uid = this.props.uid
    if (!uid) {
      return <Redirect to='/' />
    }

    return (
      <StyledContainer>
        <Container>
        </Container>
      </StyledContainer >
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(CreateCountry)

