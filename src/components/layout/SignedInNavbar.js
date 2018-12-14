import React from 'react'
import { NavLink } from "react-router-dom";
import { Nav } from 'react-bootstrap'

const SignedInNavbar = () => {
  return (
    <Nav>
      <NavLink exact to='/'>
        <Nav.Link as='span'>Posts</Nav.Link>
      </NavLink>
      <NavLink to='/create'>
        <Nav.Link as='span'>Create New Post</Nav.Link>
      </NavLink>
      <NavLink to='/signout'>
        <Nav.Link as='span'>Sign Out</Nav.Link>
      </NavLink>
    </Nav>
  )
}

export default SignedInNavbar
