import React, { useState } from 'react'
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useForm} from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from "@material-ui/core/AppBar";
import {BrowserRouter, Link,Route,Switch } from 'react-router-dom'
import PropTypes from "prop-types";
import { ExpansionPanelDetails } from '@material-ui/core';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import '../App.css'
const {register,handleSubmit,errors}=useForm();
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});



const btn = {
  margin:'20px'
}

class GamePlayer extends React.Component {
    state = {
      value: 0
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    handleChangeIndex = index => {
      this.setState({ value: index });
    };
    
render() {
  const [url, setUrl] = useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg");
  const [value, setValue] = React.useState(1); 
  const { classes, theme } = this.props;
  // const classes = useStyles();
 
  const onSubmit=(data)=>
  {
    console.log(data);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    // <div className="Game_A">
    
//       <BrowserRouter>
//       <div className={classes.root}>
//           <AppBar position="static" color="default">
//   <Tabs
//     value={value}
//     indicatorColor="primary"
//     textColor="primary"
//     onChange={handleChange}
//     aria-label="disabled tabs example"
//   >
//     <Tab label="Classic" component={Link} to="/classic" />
//     <Tab label="Express" component={Link} to="/express" />
//     <Tab label="Challenge" component={Link} to="/challenge"  />
//   </Tabs>
//   </AppBar>
// <Switch>
//     <Route path="/classic" component={PageShell(Classic)} />
//     <Route path="/express" component={PageShell(Express)} />
//     <Route path="/challenge" component={PageShell(Challenge)} />
//   </Switch>
//   </div>
//   </BrowserRouter>
  )
}
}
function Classic(theme) {
  return (
    <Paper>
      <div>Item 1</div>
    </Paper>
  );
}

function Express(theme) {
  return (
    <Paper>
      <div>Item two</div>
    </Paper>
  );
}
function Challenge(theme) {
  return (
    <Paper>
      <div><h1>Hello Hi welcome</h1></div>
    </Paper>
  );
}
const PageShell = (Page, previous) => {
  return props => (
    <div className="page">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionName={props.match.path === "/classic" ? "SlideIn" : "SlideOut"}
      >
        {console.log(props)}
        <Page {...props} />
      </ReactCSSTransitionGroup>
    </div>
  );
};
export default GamePlayer




 // {/* // <ButtonGroup  color="primary" aria-label="contained primary button group">
    // //   <Button style={btn}>Classic</Button>
    // //   <Button style={btn}>Express</Button>
    // //   <Button style={btn}>Challenge</Button>
    // // </ButtonGroup> */}
    
  //   if({value}==1)
  //   {
  //     <form className="expressForm" onSubmit={handleSubmit(onSubmit)}>
  //     <div>
  //     <label>Enter some hints to the song</label>
  //     <input className="inputExpress" type="text"></input>
  //     <div>
  //        <input type="submit"></input>
  //     </div> 
  //     </div> 
  // </form>
    //}
    // <Card className={classes.card}>
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}
    //       image={url}
    //       title="Song Guess "
    //     />
    //     <CardContent>
    //       <Typography variant="body2" color="textPrimary" component="p">
    //         Sing a song related to the shown picture
    //       </Typography>
    //       <form className={classes.text} noValidate   autoComplete="off">
    //         <TextField id="outlined-basic" label="Search for a picture" variant="outlined" />
    //        </form>
    //     </CardContent>
    //   </CardActionArea>

    // </Card>

    
  //</div>