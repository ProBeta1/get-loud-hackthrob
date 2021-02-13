import React, { useEffect } from 'react'
import YoutubePlayer from './YoutubePlayer'
import { db } from '../firebase/firebase';

function Senorita(props) {
  const keyVal = props.keyVal;

  useEffect(() => {
    // keep check if invite accepted
    db.ref(keyVal).on('value', (snapshot) => {
      const data = snapshot.val();
      
    })
  },[])
  
  return (
    <div className="container mainpage">
      <YoutubePlayer />
      <h2>
        Send this code to her : {keyVal}
      </h2>
    </div>
  )
}

export default Senorita
