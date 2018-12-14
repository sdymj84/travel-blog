import React from 'react'
import { NavLink } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'


const SignedInNavbar = () => {
  return (
    <Nav>
      <NavLink to='/signin'>
        <Nav.Link as='span'>Sign In</Nav.Link>
      </NavLink>
      <NavLink to='/signup'>
        <Nav.Link as='span'>Sign Up</Nav.Link>
      </NavLink>
    </Nav>
  )
}

export default SignedInNavbar
