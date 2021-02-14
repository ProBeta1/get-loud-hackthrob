import React from 'react'
import styled from "styled-components";

const background = {
  height:'420px',
  padding:'5px',
  margin:'30px'
}
const Audio = styled.audio`
  justify-content: center;
  align-items:center;
  display:flex;
`;

const image = {
  borderRadius:'50px',
  padding:'10px',
  height:'300px',
}

// UI component for person 
function AudioHead(props) {
  return (
    <div style={background}>
      <img src={props.who} style={image} />
      {props.muted === true ?
      <Audio playsInline muted controls ref={props.audio} autoPlay />      
      :
      <Audio playsInline controls ref={props.audio} autoPlay />
      }
    </div>
  )
}

export default AudioHead
