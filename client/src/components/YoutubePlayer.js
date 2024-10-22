import React,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import searchYoutube from 'youtube-api-v3-search';
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button';
import '../App.css'
const opts = {
  width:'600px',
  height:'400px'
  };
  
const searchBar = {
    margin:'40px',
    borderRadius:'50px',
    width:'400px'
}

const textB = {
  borderRadius:'30px',
  margin:'20px',
  width:'60%',
  outline:'none',
  padding:'10px',
  color:'black'
}

function YoutubePlayer() {
  const [query,setQuery]=useState('stay by my side twice karaoke');
  const [ytid, setYtid] = useState("7sbsQQ-uu8g");
  const {register,handleSubmit,errors}=useForm();
  
  const onSubmit=(e)=>
  {
      console.log(e.query);
      setQuery(e.query+" Karaoke");
      console.log(query);
  }
  useEffect(() => {
    let API_KEY=process.env.REACT_APP_GOOGLE_API_KEY;
    const options = {
      q:query,
      part:'snippet',
      type:'video'
    }
    const videoSearch = async () => {
      let result = await searchYoutube(API_KEY,options);
      setYtid(result.items[0].id.videoId);
    }

    videoSearch();
  }
   //style={{justifyContent:'center', alignItems:'center',padding:'50px'}}

  , [query]);
  return (
    <div className="container" >
      <form style={searchBar} onSubmit={handleSubmit(onSubmit)}>
          <input type="text" name="query" ref={register({required:'Please Enter all details'})} placeholder="Search the song" style={textB}/>
          <Button variant="contained" color="secondary" type="submit" value="submit">
            Play
          </Button>
      </form>

      <YouTube className="youtube_p" videoId={ytid} opts={opts} />
      
    </div>
  )
}


export default YoutubePlayer
