import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {auth} from './firebase/firebase';
import Grid from '@material-ui/core/Grid';
import Typical from 'react-typical'
import AudioChat from './components/AudioChat';
import HeartBubble from './components/HeartBubble';

// import AudioChat from './components/AudioChat';
import Navbar from './components/Navbar'
import GreenRoom from './components/GreenRoom';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div style={{justifyContent:'center', alignItems:'center', height:'100vh',backgroundImage: `url("https://media.glamour.com/photos/5d766afe5dafb500084b9518/master/w_4200,h_2824,c_limit/GettyImages-502138854.jpg")`,  backgroundSize: 'cover',
    }}>
        <Grid container justify="center" alignContent="center" style={{height:'100vh', flexDirection:'column'}}  >
          <Grid item style={{color:'white', fontSize:'50px', fontWeight:'bold'}}>
            <Typical
              steps={['Welcome Buddy !!', 1000, 'Invite your peer and sing your heart out :)', 1500]}
              loop={Infinity}
            />
          </Grid>
          <Grid item>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
          </Grid>
        </Grid>

      </div>
    );
  }
  return (
    <div>
        <GreenRoom />
    </div>
  );
}

export default App;