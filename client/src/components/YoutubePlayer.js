import React, {useState, useEffect} from 'react'
import YouTube from 'react-youtube';


const searchBar = {

    marginTop:'-50px',
    marginBottom:'20px',
    paddingLeft:'100px',
    paddingRight:'100px',
    paddingTop:'10px',
    paddingBottom:'10px',
    backgroundColor:'gray',
    borderRadius:'50px'
}



// search bar and the player
function YoutubePlayer() {
  const [ytid, setYtid] = useState("2g811Eo7K8U");

  const opts = {
    height: '500',
    width: '500',
  };
  return (
    <div>
      <form style={searchBar}>
          <input type="text" name="query" placeholder="Search the song" />
        <input type="submit" value="Submit" />
      </form>

      <YouTube videoId={ytid} opts={opts} />
      
    </div>
  )
}


export default YoutubePlayer
