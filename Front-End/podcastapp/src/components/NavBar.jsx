import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import "./Navbar.css"
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar'




/* ===================
    Navigation to pages 
   ===================*/




export default function NavBar(props) {
  const history = useHistory();

  return (


    <Navbar className="navbar navbar-expand-lg navbar-light bg-light" >

      <a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
        {/* <img
                src="https://icons-for-free.com/iconfiles/png/512/earbud+headphones-131964735209526503.png"
                height="20"
                alt=""
                loading="lazy"/> */}
        <i className="fa fa-podcast" aria-hidden="true"></i>
      </a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav">

          <li className="nav-item active ">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>

          

          
        </ul>
      </div>
      {!props.isLoggedIn ?
        <>
          <div className="collapse navbar-collapse" className="topnav-right" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item" className='nav-signup'>
                <a className="nav-link" href="/signup">SignUp</a>
              </li>

              <li className="nav-item" className="nav-login">
                <a className="nav-link" href="/login">LogIn</a>
              </li>
            </ul>
          </div>
        </> :
        
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* <a className="nav-link" href="/Allchannel">Channels</a> */}
            <a className="nav-link mt-2" href="/Allchannel"  style={{"fontSize":'16px'}}><strong>Channels</strong></a>
          </li>
         
          <li className="nav-item">
            {/* <a className="nav-link" href="/Mysub">Subscriptions</a> */}
            <a className="nav-link mt-2 " href="/Mysub"><strong className="d-none d-sm-block ms-1" style={{"fontSize":'16px'}}>Subscriptions</strong></a>

          </li>
  
            <li className="nav-item me-3 me-lg-1" className="nav-item active">
              <a title="Profile" className="nav-link d-sm-flex align-items-sm-center" href="/Profile">
                {/* <img
                  src={props.data.image}
                  // "https://mdbootstrap.com/img/new/avatars/1.jpg"
                  className="rounded-circle"
                  height="22"
                  alt=""
                  loading="lazy" /> */}

               <Avatar alt="Remy Sharp" src={props.data.image}  />
                <strong className="d-none d-sm-block ms-1">{props.data.name}</strong>
              </a>
            </li>
           
            <button title="Log Out"
              onClick={() => {
                console.log("Logging Out!");
                localStorage.removeItem("jwtToken");
                props.loginCallback();
                history.push("/");
              }}
            >
              <i className="fa fa-sign-out text-dark" ></i>
            </button>
          </ul>

        </div>

      }





    </Navbar>

  )
}
