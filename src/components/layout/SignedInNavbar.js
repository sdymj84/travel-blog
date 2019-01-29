import React from 'react'
import { NavLink } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import { signOut } from "../../actions/authActions";
import { connect } from "react-redux";

const SignedInNavbar = (props) => {
  return (
    <Nav>
      <NavLink to='/'>
        <Nav.Link as='span'>Posts</Nav.Link>
      </NavLink>
      <NavLink to='/create'>
        <Nav.Link as='span'>Create New Post</Nav.Link>
      </NavLink>
      <NavLink to='/signout' onClick={props.signOut}>
        <Nav.Link as='span'>Sign Out</Nav.Link>
      </NavLink>
    </Nav>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInNavbar)
