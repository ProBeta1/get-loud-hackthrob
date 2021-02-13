import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { pink } from '@material-ui/core/colors';

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
}));

const btn = {
  margin:'20px'
}

function GamePlayer() {
  const classes = useStyles();

  const [url, setUrl] = useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg");

  return (
    <div className="Game_A">

    <ButtonGroup  color="primary" aria-label="contained primary button group">
      <Button style={btn}>Classic</Button>
      <Button style={btn}>Express</Button>
      <Button style={btn}>Challenge</Button>
    </ButtonGroup>


    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          title="Song Guess "
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

    
  </div>
  )
}

export default GamePlayer
