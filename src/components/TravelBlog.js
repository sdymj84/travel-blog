import React, { Component } from 'react'
import styled from 'styled-components'

const ContainerDiv = styled.div`
  position: relative;
  text-align: center;
  color: white;
  font-weight: bold;
`

const container = {
  position: 'relative',
  textAlign: 'center',
  color: 'white',
  fontSize: '7em',
  fontWeight: 'bold'
}

const imgStyle = {
  width: '100%',
  height: '100vh',
  objectFit: 'cover'
}

const CenteredContentDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7vw;
  @media (max-width: 1200px) {
    font-size: 9vw;
  }
  @media (max-width: 900px) {
    font-size: 10vw;
  }
  @media (max-width: 600px) {
    font-size: 14vw;
  }
`

const centeredContent = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '7vw'
}

const buttonStyle = {
  borderRadius: '4px',
  color: 'white'
}
const EnterButton = styled.button`
  border-radius: 4px;
  color: white;

  &:hover {
    color: lightblue;
  }
`

export class TravelBlog extends Component {
  render() {
    return (
      <div>
        <ContainerDiv className="uk-overflow-hidden">
          <img src={'img/welcome.jpg'} alt="welcome image" style={imgStyle}
            uk-scrollspy="cls: uk-animation-kenburns; repeat: true"></img>
          <CenteredContentDiv>
            <div>WELCOME TO TRAVEL BLOG</div>
            <EnterButton className="waves-effect uk-button uk-button-default 
              uk-button-large uk-width-small">ENTER</EnterButton>
          </CenteredContentDiv>
        </ContainerDiv>
      </div>
    )
  }
}

export default TravelBlog
