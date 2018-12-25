import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'



const StyledFooter = styled.div`
  /* * {
    outline: 1px solid red;
  } */
  
  footer {
    margin-top: 5em;
    padding: 2em 2em 1em 2em;
    width: 100%;
    color: white;
    background-color: #117E90dd;
  }
`

const FooterComp = () => {
  return (
    <StyledFooter>
      <footer className="">
        <Container>
          <p>All information on this website is exclusively based on my own experiences and research. Prices, opening hours, etc. are updated regularly but might have changed and have to be checked before use.</p>
          <p>Cookie and privacy policy / terms and conditions</p>
          <p>© Copyright 2015-2018 Minjun's Travel Blog. All rights reserved.</p>
        </Container>
      </footer>
    </StyledFooter>
  )
}

export default FooterComp
