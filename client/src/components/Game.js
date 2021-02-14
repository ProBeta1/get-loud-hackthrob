import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useForm} from 'react-hook-form'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import { ft, auth } from '../firebase/firebase';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
    media: {
        height: 300,
      },
      card:{
        width:400,
        height:400
      },
      text: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const dhimDhim = {
    color:'black',
    fontSize:'25px',
    margin:'25px',
    alignSelf:'flex-end'
}

export default function Game(props) {

  const curid = auth().currentUser.uid;

  const [id, setId] = useState(props.id);

  const [turn, setTurn] = useState(0);
  const [guessLine, setGuessLine] = useState("haha haha");

  useEffect(() => {
    if(id !== 'lol'){
      ft.collection("rooms").doc(props.id)
      .onSnapshot((doc) => {
        if(doc.data()){
          setTurn(doc.data().turn);
        }
      })
    }
    
  },[id])

  useEffect(() => {
    if(turn === curid){
      //read guess
      ft.collection("rooms").doc(props.id)
      .onSnapshot((doc) => {
        if(doc.data()){
          setGuessLine(doc.data().guessLine || "Nothing to show");
        }
      }) 
    }
  },[turn])

  const handleSwap = () => {

  }

  const onSubmit = (data) => {
          //write guess
          let roomRef = ft.collection('rooms').doc(props.id);
          roomRef.set({
              guessLine: data.text
          }, { merge: true });
          alert("Lines sent to your partner!")
  }

  const {register,handleSubmit,errors}=useForm();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [url, setUrl] = useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let expressContent;
  if(turn !== 0){
    // if this is my chance
    if(turn === curid){
      expressContent = (
        <div>
          <h2 style={dhimDhim}>Your partner has given this hint !</h2>
            <p style={dhimDhim}>{guessLine}</p>
        </div>
      )
    }
    else{
      expressContent = (
        <form className="form_E" onSubmit={handleSubmit(onSubmit)}>
          <div className="input_S">
          <label className="text_C">Type few lines of the song you want your partner to guess and sing !</label>
          <input name="text" type="textarea" className="textArea" ref={register({required:'Please Enter all details'})}></input>
          </div> 
          <div style={{display:'flex', justifyContent:'center'}}>
              <input className="submit_B" type="submit"></input>
          </div> 
        </form>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Classic" {...a11yProps(0)} />
          <Tab label="Express" {...a11yProps(1)} />
          <Tab label="Challenge" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel  value={value} index={0}>
      <p className="text_L"> It's a simple Game only</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {expressContent}
      </TabPanel>
      <TabPanel  value={value} index={2}>
       <p className="text_C" > Challenge Game Show Happening Here</p>
       <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          title="Song Guess"
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            Sing a song related to the shown picture
          </Typography>
          <form className={classes.text} noValidate   autoComplete="off">
            <TextField id="outlined-basic" label="Search for a picture" variant="outlined" />
           </form>
        </CardContent>
      </CardActionArea>
    </Card>
      </TabPanel>

      <div style={{display:'flex', justifyContent:'flex-end'}}>
        {
          turn !== curid?
            <h2 style={dhimDhim}>Other person has to sing</h2>
          :
          <h2 style={dhimDhim}>Its your turn, rise and shine</h2>
        }
          <Button style={{margin:'30px'}} variant="contained" color="primary" onClick={handleSwap}>
                 Swap Turn
             </Button> 
      </div>     
    </div>

  );
}
