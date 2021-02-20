import React,{useState,useEffect} from 'react'
import { Row, Form, Col, Button, Image, Spinner } from "react-bootstrap";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import API_URL from "./apiConfig"
import axios from "axios" 

export default function Editpassword(props) {
    const history = useHistory();
    const[cpassword,setCpassword] =  useState(false)
    const[confirmPassword1,setconfirmPassword1] =  useState(false)
    const[confirmPassword2,setconfirmPassword2] =  useState(true)
    const[newpass,setnewpass] =  useState('')
    const[passwordNot,setpasswordNot] =  useState(true)
    const[successfully,setsuccessfully] =  useState(true)
    const [password, setpassword] = useState(true);

    // const[currntE,setcurrntE] =  useState(true)
    // const[passwordE,setpasswordE] =  useState(true)
    // const [CpasswordE, setCpasswordE] = useState(true);
    
    

    const [credentials, setCredentials] = useState({ email: props.data.email, password: "" });
    const [user,setUser]=useState({})
    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setCredentials({
          ...credentials,
          [name]: value,
        });
      };


      const onChangeInput1 = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });

        if (name == "password") {
            if (value.length < 6) {
              setpassword(false)
            }
            else {
              setpassword(true)
            }
          }
        // console.log(value)
        if(name ==  "password"){
            setnewpass(value)
        }
        if(name ==  "confirmPassword"){
            if(value == newpass){
                setconfirmPassword1(true)
                setconfirmPassword2(true)
            }
            else{
                setconfirmPassword1(false)
                setconfirmPassword2(false)
            }
        }
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
              setCpassword(true)
              console.log("setCredentials(true)111")
              
            } else {
              console.log("Login error: ", msg);
              setpasswordNot(false)
              setTimeout(() => {
                setpasswordNot(true);
            }, 3000);
            }
          });
          console.log("credentials" ,cpassword)

      };

      useEffect(() => {
        console.log("cpassword useeffect",cpassword)
        if(cpassword && confirmPassword1){
            // event.preventDefault();
            axios.put(`${API_URL}/api/users/Editpassword/${props.data._id}`, user)
            .then((res) => {
                    console.log("password change")
                    // history.push("/Profile");
                    setsuccessfully(false);
                    setTimeout(() => {
                        setpasswordNot(true)
                        history.push("/Profile");
                        setsuccessfully(true);
                    }, 1500);
                    
            })
            .catch((err) => console.log(err));
        }
        else{
            console.log("no")
        }
    }, [cpassword])

    return (
        // <div>
        //         <Form.Group as={Col} controlId="formGridEmail">
        //         <Form.Label>current Password </Form.Label>
        //         <Form.Control style={{ width: '300px ' }}
                    
        //             type="Password"
        //             name="password"
        //             onChange={(e) => onChangeInput(e)}
        //         />
                
        //         </Form.Group>
        //     <Form.Group as={Col} controlId="formGridEmail">

        //         <Form.Label>New Password </Form.Label>

        //         <Form.Control style={{ width: '300px ' }}
                   
        //             type="Password"
        //             name="password"
        //             onChange={(e) => onChangeInput1(e)}
        //         />
        //         {/* <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
        //             {msg}
        //         </Alert>} /> */}
        //     </Form.Group>
        //     <Form.Group as={Col} controlId="formGridEmail">
        //         <Form.Label>Confirm Password </Form.Label>
        //         <Form.Control style={{ width: '300px ' }}
        //             type="Password"
        //             name="confirmPassword"
        //             onChange={(e) => onChangeInput1(e)}
        //         />
                
        //         </Form.Group>

        //         <div class="p-t-10">
        //                 <button class="btn btn--pill btn--green" type="submit" onClick={(e) => onSubmit(e)}>Submit</button>
        //             </div>
        // </div>
        <div class="main3">
            
        <div class="edit-form">
{!successfully &&(
   <Alert severity="success">Your password has been changed successfully</Alert>
)}
 

        <form >
            <h2>Change Password</h2>
            <div className="form-group">
            <label for="fname"> Current Password</label>
                <input type="Password"  className="form-control" name="password"  onChange={(e) => onChangeInput(e)}/>
            </div>
            {!passwordNot && (
                <Alert severity="error" > Password Incorrect </Alert>
              )}
            <div className="form-group">
            <label for="fname">New Password</label>
                <input type="Password" className="form-control" name="password"   onChange={(e) => onChangeInput1(e)}/>
            </div>
            {!password && (
                <Alert severity="error">
                  password must be more than 6
                </Alert>
              )}
            <div className="form-group">
            <label for="fname">Confirm Password</label>
                <input type="Password"  className="form-control" name="confirmPassword"   onChange={(e) => onChangeInput1(e)}/>
            </div>
            {!confirmPassword2 && (
                <Alert severity="error">
                  Password Not Match !!
                </Alert>
              )}
            <div className="form-group text-center">
                  <button id="but" type="submit" className="btn btn-primary btn-lg w-100" onClick={(e)=> onSubmit(e)}>Save</button>
          </div>
            </form>
            </div>
            </div>
    )
}
