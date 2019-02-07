import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeletePostModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>DELETE POST</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this post?<br />
        It will also delete all the images you uploaded completely<br />
        and this cannot be undone.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          CANCEL
            </Button>
        <Button variant="danger" onClick={props.handleDelete}>
          DELETE POST
            </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePostModal
