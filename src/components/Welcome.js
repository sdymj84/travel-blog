import React from 'react'
import styled from 'styled-components'

const ContainerDiv = styled.div`
  position: relative;
  text-align: center;
  color: white;
  font-weight: bold;
`

const MainImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`

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

const EnterButton = styled.button`
  border-radius: 4px;
  && {
    color: white;
  }

  &:hover {
    background-color: skyblue;
    color: #000522;
  }
`

export const Welcome = () => {
  return (
    <div>
      <ContainerDiv className="uk-overflow-hidden">
        <MainImage src={'img/welcome.jpg'} alt="welcome image"
          uk-scrollspy="cls: uk-animation-kenburns; repeat: true"></MainImage>
        <CenteredContentDiv>
          <div>WELCOME TO TRAVEL BLOG</div>
          <EnterButton className="waves-effect uk-button uk-button-default 
            uk-button-large uk-width-small">ENTER</EnterButton>
        </CenteredContentDiv>
      </ContainerDiv>
    </div>
  )
}

export default Welcome
