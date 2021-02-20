import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button,  ProgressBar } from "react-bootstrap";
import Alert from '@material-ui/lab/Alert';
import Axios from "axios";
import { useParams } from 'react-router-dom';
import API_URL from "./apiConfig"
import { Link } from "react-router-dom";
import axios from 'axios'
import './editprofile.css'
export default function EditProfile(props) {
  const { id } = useParams()
  const history = useHistory();
  const [user, setUser] = useState(props.data)
  const [image, setImage] = useState('')
  const[successfully,setsuccessfully] =  useState(true)
  const [uploadPercentage1, setUploadPercentage1] = useState(0);

  const { name, email, bio, _id } = props.data


  console.log(props.data)
  const [channel, setChannnel] = useState([])

  useEffect(() => {
    Axios.get(`${API_URL}/api/users/`)
      .then(res => {
        // console.log(props.data._id)
        console.log(res.data.users)
        setChannnel(res.data.users)

      })

  }, [])
  var username = ''
  var userEmail = ''
  var userbio = ''
  var userimage = ''

  channel.map((channel) => {
    if (channel._id == props.data._id) {
      username = channel.name
      userEmail = channel.email
      userbio = channel.bio
      userimage = channel.image
    }
  })


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
        setUploadPercentage1(100);
        setTimeout(() => {
          setUploadPercentage1(0);
        }, 1000);
       
        console.log("inside", image)
        setUser({ ...user, image: file.secure_url });
        setImage(file.secure_url)

      }).catch(err => { console.log(err); setUploadPercentage1(0) })

  }

  console.log("outside", image)
  const onChangeInput = ({ target: { name, value } }) => {
    console.log("aaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbb")
    setUser({ ...user, [name]: value });
  };

  const onSubmit = (event) => {
    console.log("test befor", user.image)
    console.log("test befor", user)
    event.preventDefault();
    Axios.put(`${API_URL}/api/users/EditProfile/${id}`, user)
      .then((res) => {
       
        setsuccessfully(false);
        setTimeout(() => {
            
            history.push("/Profile");
            setsuccessfully(true);
        }, 1500);
      })
      .catch((err) => console.log(err));
  };




  return (
    <div class="main3">
  
      <div class="edit-form">
      {!successfully &&(
   <Alert severity="success">Your Profile has been changed successfully</Alert>
)}
        <form >
          <h2>Edit Profile</h2>
          <div className="form-group">
            <input type="name" defaultValue={username} className="form-control" name="name" placeholder="Your name" onChange={onChangeInput} />
          </div>
          <div className="form-group">
            <input type="email" defaultValue={userEmail} className="form-control" name="email" placeholder="Email Address" onChange={onChangeInput} />
          </div>
          <div className="form-group">
            <input type="text" defaultValue={userbio} className="form-control" name="bio" placeholder="bio" onChange={onChangeInput} />
          </div>
          <div className="form-group">
            <input type="file" defaultValue={userimage} className="form-control" name="image" placeholder="Enter Images" onChange={uploadImage} />
            {uploadPercentage1 > 0 && (
              <ProgressBar
                now={uploadPercentage1}
                striped={true}
                label={`${uploadPercentage1}%`}
              />
            )}
          </div>
          <div className="form-group text-center">
            <button id="but" type="submit" className="btn btn-primary btn-lg w-100" onClick={onSubmit}>Edit Profile</button>
          </div>
        </form>
        <div class="text-center"> <Link to="/Editpassword">Change Password? <i id="pass" class="fa fa-key" aria-hidden="true"></i> </Link></div>
        <div class="text-center"> <Link to="/Profile">Return To the profile page? </Link></div>
      </div>
    </div>
  )
}