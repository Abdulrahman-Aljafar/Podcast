import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button } from "react-bootstrap";
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import "./SignUp.css"
import API_URL from "./apiConfig"
// import API_URL from '../apiConfig'


export default function Singup(props) {
  const history = useHistory();

  const [user, setUser] = useState({}); // user info
  const [register, setRegister] = useState(true); // to show aleart
  const [image, setImage] = useState('')
  const [name, setname] = useState('')
  const [password, setpassword] = useState(true);
  const [name11, setName11] = useState(true);
  const [email11, setemail11] = useState(true);
  const [emailE, setemailE] = useState(true);
  const [confirmPassword1, setconfirmPassword1] = useState(true)
  const [newpass, setnewpass] = useState('')
  const [passwordE, setpasswordE] = useState(true);
  const [cpasswordE, setCpasswordE] = useState(true);


  //to add the input inside user
  const onChangeInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    // console.log(value)


    if (name == "password") {
      if (value.length < 6) {
        setpassword(false)
      }
      else {
        setpassword(true)
      }
    }

    if (name == "email") {
      if (!value.includes("@")) {
        setemail11(false)
      }
      else {
        setemail11(true)
      }
    }


  };

  //==================
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    console.log('file', files[0])
    data.append('upload_preset', 'xvn0ezmv')
    axios.post('https://api.cloudinary.com/v1_1/duuconncq/image/upload', data)
      .then(res => {
        console.log("res", res)
        const file = res.data

        setUser({ ...user, image: file.secure_url });
        setImage(file.secure_url)

      }).catch(err => { console.log(err) })

  }


  // to add the user info to database
  const onSubmit = (event) => {
    console.log("test befor", user.name)



    event.preventDefault();
    axios
      .post(`${API_URL}/api/users/register`, user)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          history.push("/login");
        } else {
          setTimeout(() => {
            setRegister(false);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
    if (!user.name) {
      setName11(false)
      setTimeout(() => {
        setName11(true);
    }, 3000);
    }
    if (!user.email) {
      setemailE(false)
      setTimeout(() => {
        setemailE(true);
    }, 3000);
    }

    if (!user.password) {
      setpasswordE(false)
      setTimeout(() => {
        setpasswordE(true);
    }, 3000);
    }
    if (!user.ConfirmPassword) {
      setCpasswordE(false)
      setTimeout(() => {
        setCpasswordE(true);
    }, 3000);
    }

  };

  const onChangeInputPassWord = ({ target: { name, value } }) => {
    console.log(value, name)
    // console.log(value)

    if (name == "password") {
      setnewpass(value)

    }
    if (name == "ConfirmPassword") {
      console.log("insude")
      if (value == newpass) {
        setconfirmPassword1(true)
        console.log("confirmPassword1", confirmPassword1)
      }
      else {
        setconfirmPassword1(false)
        console.log("confirmPassword1 else", confirmPassword1)
      }
    }

  };


  return (
    <>


      <div class="page-wrapper bg-gra-01 p-t-100 p-b-100 font-poppins">
        <div class="wrapper wrapper--w780">
          <div class="card card-3">
            <div class="card-heading"></div>
            <div class="card-body">
              <h2 class="title">SignUp</h2>

              <div class="input-group" >
                <input class="input--style-3"  type="text" placeholder="Name" name="name" onChange={ onChangeInput} style={{ "color": "white" }} />

              </div>
              {!name11 && (
                <Alert severity="error" > Name Must Not Be Empty</Alert>
              )}

              <div class="input-group pt-3">
                <input class="input--style-3" type="email" placeholder="Email" name="email" onChange={ onChangeInput} style={{ "color": "white" }} />
                {!register && (
                  <Alert severity="error">
                    The email is already in use. Please change the email
                  </Alert>
                )}
              </div>
              {!email11 && (
                <Alert severity="error">
                  Email not incorrect !!
                </Alert>
              )}
              {!emailE && (
                <Alert severity="error">
                  Email Must Not Be Empty !!
                </Alert>
              )}
              <div class="input-group pt-3">
                <input class="input--style-3" type="password" placeholder="password" name="password" onChange={(e) => { onChangeInput(e); onChangeInputPassWord(e) }} style={{ "color": "white" }} />
              </div>
              {!password && (
                <Alert severity="error">
                  password must be more than 6
                </Alert>
              )}
  
              {!passwordE && (
                <Alert severity="error">
                  Password Must Not Be Empty
                </Alert>
              )}
              <div class="input-group pt-3">
                <input class="input--style-3" type="password" placeholder="Confirm Password " name="ConfirmPassword" onChange={(e) => { onChangeInput(e); onChangeInputPassWord(e) }} style={{ "color": "white" }} />
              </div>
              {!confirmPassword1 && (
                <Alert severity="error">
                  Password Not Match !!
                </Alert>
              )}
              {!cpasswordE && (
                <Alert severity="error">
                  Confirm Password Must Not Be Empty
                </Alert>
              )}
              <div class="input-group pt-3">
                <input class="input--style-3" type="file" placeholder="Enter Image" name="image" onChange={uploadImage} style={{ "color": "white" }} />
              </div>
              <div class="input-group">
                <input class="input--style-3" type="text" placeholder="Bio" name="bio" onChange={onChangeInput} style={{ "color": "white" }} />

              </div>
              <div class="p-t-10">



  <button class="btn btn--pill btn--green" type="submit" onClick={onSubmit}>Submit</button>
              </div>

            </div>
          </div>
        </div>
      </div>



    </>)
}