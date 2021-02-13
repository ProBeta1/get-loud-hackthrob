import React,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import searchYoutube from 'youtube-api-v3-search';
import YouTube from 'react-youtube';

// import { Component } from 'react';

// import YTSearch from 'youtube-api-search'
const opts = {
    height: '500',
    width: '500',
  };
  
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


function YoutubePlayer() {
  console.log("funtciot");
  const [query,setQuery]=useState('twice i cant stop me english karaoke');
  const [videos,setVideos]=useState([]);
  const [video,setVideo]=useState('');
  const [ytid, setYtid] = useState("2g811Eo7K8U");
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
   

  , [query]);
  return (
    <div>
      <form style={searchBar} onSubmit={handleSubmit(onSubmit)}>
          <input type="text" name="query" ref={register({required:'Please Enter all details'})} placeholder="Search the song" />
        <input type="submit"  value="Submit" />
        <h1>HIIII</h1>
      </form>

      <YouTube videoId={ytid} opts={opts} />
      
    </div>
  )
}


export default YoutubePlayer
