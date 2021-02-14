import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import AudioHead from './AudioHead';
import boy from '../images/boy.png';
import girl from '../images/girl.png';
import '../App.css'
import YoutubePlayer from './YoutubePlayer';
import { ft, auth } from '../firebase/firebase';

const image = {
  borderRadius:'20px',
  maxHeight:'200px',
  maxWidth:'200px'
}

function AudioChat(props) {

  const uid = auth().currentUser.uid;

  const [yourID, setYourID] = useState("");
  const [yourName, setYourName] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [toSearch, setToSearch] = useState("lol");

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

    setToSearch(yourID);

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

    ft.collection('rooms').doc(caller).set({
      peer1: caller,
      peer2: yourID,
      turn:uid,
    })

    setToSearch(caller);
  }

  useEffect(() => {
      ft.collection("rooms").doc(toSearch)
      .onSnapshot((doc) => {
          console.log("saman = " + doc.data());
      })
      props.handleRoomIdChange(toSearch);
    
  },[toSearch]);

  let UserAudio;
  if (stream) {
    UserAudio = (
      <AudioHead audio={userAudio} muted={true} who="https://tigerbeat.com/wp-content/uploads/2016/10/GettyImages-602353804-845x640.jpg"/>
    );
  }

  let PartnerAudio;
  if (callAccepted) {
    PartnerAudio = (
      <AudioHead audio={partnerAudio} muted={false} who="http://theteenagertoday.com/wp/wp-content/uploads/2018/05/camila-cabello.jpg"/>
    );
  }

  if( callAccepted ){
    return(
      <div className="container mainpage">
      <YoutubePlayer/>
        {UserAudio}
        {PartnerAudio}
      </div>
    )
  }

  let incomingCall; 
  
  if (receivingCall) {
    incomingCall = (
      <div className="buttonforaccept">
        <h2>Your partner is calling you </h2>
        <img src="https://i.pinimg.com/originals/20/b6/86/20b6860e2f5560e6fae086a51051bdbc.gif" style={image} />
        <button style={{padding:'5px', margin:'5px'}} onClick={acceptCall}>Accept</button>
      </div>
    )
  }

  return (
    <div className="container mainpage">
      <YoutubePlayer/>
        <div style={{display:'flex', flexDirection:'column'}}>
        {UserAudio}
            {Object.keys(users).map(key => {
              if (key === yourID) {
                return null;
              }
              return (
                <button style={{padding:'20px'}} className="buttonforaccept"  onClick={() => callPeer(key)}>Call {key}</button>
              );
            })}
        </div>
        {PartnerAudio}
        
        {incomingCall}
        </div>
  );
}

export default AudioChat;
