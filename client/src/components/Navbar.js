import React from "react";
import '../tailwind.css'
import '../tailwind.min.css';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
// import GamePlayer from "./GamePlayer";
import Game from './Game'
// import YoutubePlayer from "./YoutubePlayer";
import AudioChat from "./AudioChat";
const Nav=({ fixed }) =>{
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [roomId, setRoomId] = React.useState("None");

  const handleRoomIdChange = (id) => {
    setRoomId(id);
  }
  return (
    <>
     <BrowserRouter>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold heading_NAV leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white"
              href="#"
            >SingwithYourValentine
            </a>
            {/* <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button> */}
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  <span className="ml-2"><Link className="nav-link" to="/">Home</Link></span>
                </a>
              </li>
            
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  <span className="ml-2"><Link className="nav-link" to="/gameplayer">GamePlayer</Link></span>
                </a>
              </li>
             
             
            </ul>
          </div>
        </div>
      </nav>
       <Switch>
        <Route exact path="/">
          <AudioChat handleRoomIdChange={handleRoomIdChange}/>
          </Route>
          <Route exact path="/gameplayer">
          <Game id={roomId}/>
        </Route>  
      </Switch> 
      </BrowserRouter>
    </>
  );
}
export default Nav