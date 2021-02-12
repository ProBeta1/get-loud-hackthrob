import React from 'react'
import styled from "styled-components";

const background = {
  backgroundColor:'blue',
  borderRadius:'50px',
  padding:'50px',
}
const Audio = styled.audio`
  width: 250px;
  height: 100px;
`;

// UI component for person 
function AudioHead(props) {
  return (
    <div style={background}>
      {props.muted === true ?
      <Audio playsInline muted controls ref={props.audio} autoPlay />      
      :
      <Audio playsInline controls ref={props.audio} autoPlay />
      }
    </div>
  )
}

export default AudioHead
