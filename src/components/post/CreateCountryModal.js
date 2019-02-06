import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import ContinentDropdown from './ContinentDropdown'


const StyledContainer = styled.div`
  .form-control-file {
    margin-top: 5px;
  }

  #country-image {
    border: 1px solid #CED4DA;
    border-radius: 4px;
    margin: 0;
  }

`

export class CreateCountryModal extends Component {

  render() {
    const { handleSubmit, handleChange, handleContinentChange,
      handleSelectedFile, ...modalProps } = this.props
    return (

      <Modal
        {...modalProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Create Country
          </Modal.Title>
        </Modal.Header>

        <StyledContainer>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <ContinentDropdown handleContinentChange={handleContinentChange} />
              <Form.Group controlId="countryName">
                <Form.Control type="text" placeholder="Country Name" onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="summary">
                <Form.Control type="text" placeholder="Summary" onChange={handleChange} required />
              </Form.Group>

              <Form.Group as={Row} id="country-image">
                <Form.Label column sm={4} md={4} lg={2} id="main-img-label">
                  Main Image :
                </Form.Label>
                <Col>
                  <Form.Control type='file' onChange={handleSelectedFile} />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button as="input" type="submit" value="Submit"></Button>
              <Button
                variant="secondary"
                onClick={this.props.onHide}>Cancel
            </Button>
            </Modal.Footer>
          </Form>
        </StyledContainer>
      </Modal>

    )
  }
}


export default CreateCountryModal

