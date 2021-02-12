import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import AudioHead from './AudioHead';
import YoutubePlayer from './YoutubePlayer';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;


const Audio = styled.audio`
  width: 200px;
  height: 50px;
  padding: 35px;
`;

function AudioChat() {
  const [yourID, setYourID] = useState("");
  const [yourName, setYourName] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const socket = useRef();

  const userAudio = useRef();
  const partnerAudio = useRef();

  useEffect(() => {
    socket.current = io.connect("/");
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
      setStream(stream);
      if (userAudio.current) {
        userAudio.current.srcObject = stream;
      }
    })
    
    socket.current.on("yourID", (id) => {
      setYourID(id);
    })
    socket.current.on("yourName", (uname)=> {
      setYourName(uname);
    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("letsRock", (data) => {
     setReceivingCall(true);
     setCaller(data.from);
     setCallerSignal(data.signal);
    })
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator:true,
      trickle: false,
      stream : stream,
    });

    peer.on("signal", data => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData:data,
        from : yourID
      })
    })

    peer.on("stream", stream => {
      if(partnerAudio.current){
        partnerAudio.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.current.emit("acceptCall", {
        signal: data,
        to: caller
      })
    });

    peer.on("stream", stream => {
      partnerAudio.current.srcObject = stream;
    });

    peer.signal(callerSignal);

  }

  let UserAudio;
  if (stream) {
    UserAudio = (
      <AudioHead audio={userAudio} muted={true}/>
    );
  }

  let PartnerAudio;
  if (callAccepted) {
    PartnerAudio = (
      <AudioHead audio={partnerAudio} muted={false}/>
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }
  return (
    <Container>
      <Row>
        {UserAudio}
        <YoutubePlayer />
        {PartnerAudio}
      </Row>
      <Row>
        {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {key}</button>
          );
        })}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
  );
}

export default AudioChat;
