import React from 'react'
import styled from 'styled-components'
import { RingLoader } from "react-spinners";


const StyledLoader = styled.div`
  min-height: calc(100vh - 376px);
  margin-top: 3em;
  display: flex;
  justify-content: center;
  align-items: center;

`

const Loading = () => {
  return (
    <StyledLoader>
      <RingLoader
        sizeUnit={"px"}
        size={100}
        color={'#308F9E'} />
    </StyledLoader>
  )
}

export default Loading
