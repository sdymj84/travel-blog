import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'


const CustomNavbar = styled.div`
  button {
    background-color: #19959e;
    border-color: #19959e;
   
    :hover {
      background-color: #157880;
      border-color: #157880;
    }
    :active {
      background-color: #116268 !important;
      border-color: #0b515e !important;
    }
  }

  .navbar {
    background-color: #117E90dd;
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 8px 6px -6px #999;
  }

`

const NavbarComp = () => {
  return (
    <CustomNavbar>
      <Navbar variant='dark' expand="lg">
        <Navbar.Brand href="#home">TravelBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to='/'>
              <Nav.Link as='span'>Home</Nav.Link>
            </Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </CustomNavbar>
  )
}

export default NavbarComp
