import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import "./SignUp.css"
import API_URL from "./apiConfig"
// import API_URL from '../apiConfig'
export default function Login(props) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, seterror] = useState(true);
  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/api/users/login`, credentials)
      .then((res) => {
        console.log("Express backend /login response", res);

        const token = res.data.token;
        const msg = res.data.msg;

        if (token) {
          localStorage.setItem("jwtToken", token);
          props.loginCallback();
          history.push("/Profile");
        } else {
          console.log("Login error: ", msg);
          seterror(false)
        }
      });
  };

  return (

   <>
   {!error && (
        <Alert variant={"danger"}>
          Email or Password incorrect !!
        </Alert>
      )}
    <div class="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
    <div class="wrapper wrapper--w780">
        <div class="card card-3">
            <div class="card-heading"></div>
            <div class="card-body">
                <h2 class="title">Login </h2>
                <form method="POST">
                        
                    <div class="input-group">
                        <input class="input--style-3" type="email" placeholder="Email" name="email"onChange={(e) => onChangeInput(e)} style={{"color":"white"}}/>
                    </div>
                    <div class="input-group">
                        <input class="input--style-3" type="password" placeholder="password" name="password"onChange={(e) => onChangeInput(e)} style={{"color":"white"}}/>
                    </div>
                    <div class="p-t-10">
                        <button class="btn btn--pill btn--green" type="submit" onClick={(e) => onSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
    
     </>

  );
}