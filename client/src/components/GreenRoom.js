// import React, { useState, useEffect } from 'react'
// import Grid from '@material-ui/core/Grid';
// import { Button } from '@material-ui/core';
// import { db } from '../firebase/firebase';
// import Peer from "simple-peer";
// import Senorita from './Senorita';


// do not try to read what is written here ! you have been warned


// const textB = {
//   borderRadius:'30px',
//   margin:'10px',
//   width:'60%',
//   outline:'none',
//   padding:'10px',
//   color:'black'
// }
 

// function GreenRoom() {
//   const [redirect, setRedirect] = useState(false);
//   const [key, setKey] = useState("");
//   const [joinKey, setJoinKey] = useState("");
//   const [stream, setStream] = useState();
//   const [text, setText] = useState("");

//   const handleChange = (e) => {
//     setText(JSON.stringify(e.target.value))
//   }

//   const handleCreate = () => {
//       // create a new peer connection
//       const peer = new Peer({
//         initiator:true,
//         trickle:false,
//         stream:stream,
//       });

//       // create a new firebase entry with a random keyword
//       const inviteKey = Math.floor(Math.random()*10000) +1;

//       setKey(inviteKey);

//       // store the signalling data into a new entry
//       peer.on("signal", data => {
//           db.ref(inviteKey).set({
//             signalData:data
//           })
//       })  
//       // pass the invite and redirect to Home
//       setRedirect(true);
//   }

//   const handleJoin = () => {
//     // create a peer
//     console.log("i cnat handle it")
//     const peer = new Peer({
//       initiator:false,
//       trickle:false,
//       stream:stream,
//     });

//     // reply to signal
//     peer.on("signal", data=>{
//       console.log(data);
//       db.ref(joinKey).update({
//         answer:data,
//       })
//     })
//   }

//   const handleJoinClick = () => {
//     console.log(text);
//     setJoinKey(parseInt(text));
//     handleJoin();
//   }

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
//       setStream(stream);
//       // if (userAudio.current) {
//       //   userAudio.current.srcObject = stream;
//       // }
//     })
//   },[])

//   if(redirect){
//     return(
//       <div>
//         <Senorita keyVal={key}/>
//       </div>
//     )
//   }

//   return (
//     <div style={{justifyContent:'center', alignItems:'center', height:'100vh',backgroundImage: `url("https://bandwagon-gig-finder.s3.amazonaws.com/editorials/uploads/pictures/19290/content_twice-singapore-1.jpg")`,  backgroundSize: 'cover',
//     }}>
//          <Grid container justify="center" alignContent="center" alignItems="center" style={{height:'100vh', flexDirection:'column'}}  >
//           <Grid item style={{color:'white', fontSize:'50px', fontWeight:'bold'}}>
//               <Button variant="contained" color="secondary" onClick={handleCreate}>
//                 Create a brand new Concert Room
//               </Button>
//           </Grid>
//           OR
//           <Grid container justify="center" alignItems="center" lignContent="center" >
//             <form>
//               <input name="join" placeholder="Enter the key" onChange={(e) => handleChange(e)} style={textB} />
//             </form>
//             <Button variant="contained" color="primary" onClick={handleJoinClick}>
//                 Join a room
//               </Button>          
//             </Grid>
//         </Grid>

//       </div>
//   )
// }

// export default GreenRoom
