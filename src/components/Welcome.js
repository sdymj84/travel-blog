import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Button } from "react-materialize";

const ContainerDiv = styled.div`
  position: relative;
  text-align: center;
  color: white;
  font-weight: bold;
  overflow: hidden;
`

const MainImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;

  animation-name: scale-up;
  animation-duration: 15s;
  animation-fill-mode: forwards;

  @keyframes scale-up {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
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

const EnterButton = styled(Button)`
  border: 1px solid white;
  border-radius: 4px;
  height: 4em;
  width: 10em;
  font-size: 15px;
  color: white;
  background-color: transparent;

  :hover {
    background-color: #117E90;
    border: 1px solid #117E90;
  }
`

export const Welcome = () => {
  return (
    <div>
      <ContainerDiv>
        <MainImage src={'img/welcome.jpg'} alt="welcome image"></MainImage>
        <CenteredContentDiv>
          <div>WELCOME TO TRAVEL BLOG</div>
          <Link to='/'>
            <EnterButton waves="light">ENTER</EnterButton>
          </Link>
        </CenteredContentDiv>
      </ContainerDiv>
    </div>
  )
}

export default Welcome
