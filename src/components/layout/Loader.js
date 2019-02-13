import React from 'react'
import styled from 'styled-components'
import { RingLoader } from "react-spinners";
import { Modal } from "react-bootstrap";


const StyledLoader = styled.div`
  position: fixed;
  margin: auto;
  top: 40%;
  bottom: 0;
  right: 0;
  left: 50%;
  margin-left: -50px;

`
const StyledModal = styled(Modal)`
  visibility: hidden;
`

const Loading = () => {
  const handleHide = () => { }

  return (
    <div>
      <StyledLoader className="loader">
        <RingLoader
          sizeUnit={"px"}
          size={100}
          color={'#308F9E'} />
      </StyledLoader>
      <StyledModal show={true}
        onHide={handleHide}></StyledModal>
    </div>
  )
}

export default Loading
