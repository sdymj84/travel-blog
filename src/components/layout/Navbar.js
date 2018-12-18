import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import SignedInNavbar from './SignedInNavbar';
import SignedOutNavbar from './SignedOutNavbar';



const StyledNavbar = styled.div`
  .nav-link, .navbar-brand {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    overflow: hidden;

    :before {
      content: "";
      position: absolute;
      z-index: -1;
      left: 51%;
      right: 51%;
      bottom: 0;
      background: white;
      height: 3px;
      -webkit-transition-property: left, right;
      transition-property: left, right;
      -webkit-transition-duration: 0.1s;
      transition-duration: 0.1s;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
    }

    :hover:before, :focus:before, :active:before {
      left: 0;
      right: 0;
    }
  }

  .navbar {
    background-color: #117E90dd;
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 8px 6px -6px #999;
  }

  .navbar-brand {
    margin-left: 1em;
    font-weight: bold;
    @media (min-width: 768px) {
      margin-left: 2em;
    }
    @media (min-width: 992px) {
      margin-left: 3em;  
    }
  }

  .nav-link {
    margin-right: 2em;
    @media (max-width: 992px) {
      margin-right: 1em;
    }
  }
  .navbar-nav:last-child {
    margin-right: 1em;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: rgba(255, 255, 255);
    :hover {
      text-decoration-line: none;
    }
  }

`

const NavbarComp = () => {
  return (
    <StyledNavbar>
      <Navbar variant='dark' expand="md">
        <Link to='/'>
          <Navbar.Brand as='span'>TravelBlog</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <SignedInNavbar />
            <SignedOutNavbar />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </StyledNavbar>
  )
}

export default NavbarComp
