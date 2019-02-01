import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import { connect } from "react-redux";
import { createPost } from '../../actions/postActions'
import { Redirect } from 'react-router-dom'
import { TiPlus } from "react-icons/ti";
import CreateCountryModal from './CreateCountryModal';


export class CreateCountry extends Component {

  state = {
    continent: "",
    countryName: "",
    summary: "",
    selectedFile: "",
    modalShow: false,
  }

  modalClose = () => {
    this.setState({ modalShow: false })
  }

  handleClick = () => {
    this.setState({ modalShow: true })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {

  }


  render() {
    return (
      <span>
        <Button
          onClick={this.handleClick}
          className="btn-new-country"
          variant="light"
        ><TiPlus /> New Country</Button>
        <CreateCountryModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </span>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(CreateCountry)

