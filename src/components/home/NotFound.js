import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'


const StyledContainer = styled.div`
  .container {
      margin-top: 3em;
  }

  #not-found {
    height: 500px;
    background-image: url('/img/notfound.jpg');
    background-repeat: no-repeat;
    background-position: center;
  }

`

const NotFound = () => {
  return (
    <StyledContainer>
      <Container id='not-found'></Container>
    </StyledContainer>
  )
}

export default NotFound
