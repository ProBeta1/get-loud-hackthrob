import React,{useState} from 'react';
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
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
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

export default function Game(props) {

  console.log("In game , id is - " + props.id);

  const onSubmit=(data)=>
    {
        console.log(data);
    }
  const {register,handleSubmit,errors}=useForm();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [url, setUrl] = useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
       <form className="form_E" onSubmit={handleSubmit(onSubmit)}>
            <div className="input_S">
            <label className="text_C">Type few lines of the song you want your partner to guess and sing !</label>
            <input name="text" type="textarea" className="textArea" ref={register({required:'Please Enter all details'})}></input>
            </div> 
            <div>
                <input className="submit_B" type="submit"></input>
            </div> 
        </form>

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
    </div>
  );
}
