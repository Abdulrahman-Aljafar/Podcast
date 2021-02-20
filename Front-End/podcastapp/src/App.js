import logo from './logo.svg';
import './App.css';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "./components/apiConfig"
import axios from "axios";
//components
import Singup from './components/Signup'
import Login from './components/Login'
import CreatePodcast from './components/CreatePodcast'
import Record from './components/Record'
import Allchannel from './components/Allchannel'
import Profile from './components/Profile'
import Allpodcast from './components/Allpodcast'
import NavBar from './components/NavBar'
import Home from './components/Home'
import EditProfile from './components/EditProfile'
import Load from './components/Loading'
import About from './components/About';
import AddComment from "./components/AddComment"
import SowOnePodcast from "./components/SowOnePodcast"
import Editpassword from "./components/Editpassword"
import Mysubscribe from "./components/Mysubscribe"


function App() {
  const [Selectpodcast, setSelectpodcast] = useState({});

  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });


  const [dataLoaded, setDataloaded] = useState(false)

  const [userData, setUserData] = useState({ currentDataUser: null })
  const [userProfile , setUserProfile] = useState({})

  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      // const currentBook = jwt_decode(jwtToken, "SECRET").book;
      const currentDataUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
      setUserData({ currentDataUser });
      // getProfile(currentUser);
      // getBook(currentBook)
      getProfile(currentUser);

    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }
    setDataloaded(true)
  }
   

  useEffect(userLogin, []);

  
  const getProfile = async (currentUser) => {
    const {data: {user}} =  await axios.get(`${API_URL}/api/users/profile/${currentUser._id}`)
    console.log('Loaded user profile: ', user)
    setUserProfile(user)
  } 




  useEffect(() => {
    if (userData == null) {
      setDataloaded(false)
    }
    else {
      setDataloaded(true)
    }
  }, [userProfile])

  









  return (

    <>
      { dataLoaded ?

        <Router>
          <NavBar isLoggedIn={auth.isLoggedIn} loginCallback={userLogin}  data={userProfile}/>

          <Route path="/signup">
            <Singup loginCallback={userLogin} />
          </Route>
          <Route path="/login">
            <Login loginCallback={userLogin} />
          </Route>

          <Route exact path="/new">
            <CreatePodcast data={userData.currentDataUser} />
          </Route>
          <Route exact path="/record">
            <Record />
          </Route>
          <Route exact path="/Allchannel">
            <Allchannel data={userData.currentDataUser} />
          </Route>
          <Route exact path="/Profile">
            <Profile data={userData.currentDataUser} />
          </Route>
          <Route exact path="/Allpodcast/:id">
            <Allpodcast data={userData.currentDataUser} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route exact path="/about">
            <About />
          </Route> */}
          <Route exact path="/EditProfile/:id">
            <EditProfile data={userData.currentDataUser} />
          </Route>
          <Route exact path="/AddComment/:id/:podId">
            <AddComment />
          </Route>
          <Route path="/Allpodcast/:id/:podId">
            <SowOnePodcast   user={userData.currentDataUser}/>
          </Route>
          <Route path="/Editpassword">
            <Editpassword loginCallback={userLogin} data={userData.currentDataUser}/>
          </Route>
          <Route path="/Mysub">
            <Mysubscribe loginCallback={userLogin} data={userData.currentDataUser}/>
          </Route>

        </Router> : <Load  />
      }
    </>
  );
}

export default App;
