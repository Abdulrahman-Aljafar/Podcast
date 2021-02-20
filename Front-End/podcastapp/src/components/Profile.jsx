import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./profile.css";
import API_URL from "./apiConfig"
import moment from 'moment'
export default function Profile(props) {
    const [channel, setChannnel] = useState([])
    const [mypodcast, setMypodcast] = useState([])
    const [user, setUser] = useState([])
    const [podcast, setpodcast] = useState([])
    const [userData, setUserData] = useState({ currentDataUser: null })
    const [onepodcast, setOnePodcast] = useState()
    const [flag, setFlag] = useState(false)
    console.log(props.data)
    console.log(props)
    const { name, email, image, bio, _id } = props.data
    useEffect(() => {
        Axios.get(`${API_URL}/api/users/`)
            .then(res => {
                // console.log(props.data._id)
                console.log(res.data.users)
                setChannnel(res.data.users)
            })
    }, [])
    useEffect(() => {
        Axios.get(`${API_URL}/api/podcast`)
            .then(res => {
                // console.log(props.data._id)
                console.log("res.data", res.data.user)
                setOnePodcast(res.data.podcast)

            })

    }, [flag])
    // useEffect(() => {

    //     axios.get(`${API_URL}/api/podcast/`)
    //         .then(res => {
    //             console.log(res.data.podcast)


    //             let podcast = res.data.podcast.find(ele => ele._id == podId)
    //             console.log(podcast)

    //             setpodcast(podcast)
    //         })

    // }, [])

    // useEffect(() => {
    //     Axios.get(`${API_URL}/api/podcast/`)
    //         .then(res => {
    //            // console.log(props.data._id)
    //            console.log("podcat 333333",res.data.podcast)
    //             setMypodcast(res.data.podcast)
    //         })
    // }, [])

    useEffect(() => {
        Axios.get(`${API_URL}/api/podcast/${props.data._id}`)
            .then(res => {
                // console.log(props.data._id)
                console.log(res.data.podcast)
                setMypodcast(res.data.podcast)
            })
    }, [flag])

    const deletePodcast = (idelete) => {
        Axios.delete(`${API_URL}/api/podcast/deletePodcast/${idelete}`)
            .then(data => {
                console.log("data", data);

            })
        setFlag(p => !p)

    }
    console.log(podcast._id)
let myallpodcast= mypodcast.map((podcast, i) => {
        if(podcast.user == _id)
            return (
                <div class="profile-content">
                <div class="tab-content p-0">
                    <div class="tab-pane fade active show" id="profile-post">
                        <ul class="timeline">
                            <li>
                                <div class="timeline-time">
                                    <span class="date">{moment(podcast.createdAt).format("MMM Do YY")}</span>
                                    <span class="time">{moment(podcast.createdAt).format('h:mm')}</span>
                                </div>
                                <div class="timeline-icon">
                                    <a href="javascript:;">&nbsp;</a>
                                </div>
                                <div class="timeline-body">
                            
                                    <div class="timeline-header">
                                        {podcast.title}
                                        
                      <button variant="outline-info" style={{"marginLeft":"15px"}}onClick={() => deletePodcast(podcast._id)} className="outline-light " ><i id="sad1" class="fa fa-trash-o" aria-hidden="true"></i></button>
                   
                                    </div>
                                    
                                    <Link to = {`/Allpodcast/${_id}/${podcast._id}`}>
                                    <div class="timeline-content">
                                        <img src={podcast.image}/>
                                    </div>
                                    </Link>
                                </div>
                            </li></ul>
                    </div>
                </div>
            </div>
            )
    });
    const profaile = channel.map((channel, i) => {
        if (props.data._id == channel._id)
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="content" class="content content-full-width">
                                <div class="profile">
                                    <div class="profile-header">
                                        <div class="profile-header-cover"></div>
                                        <div class="profile-header-content">
                                            <div class="profile-header-img">
                                                <img class="responsive" src={channel.image} alt="" />
                                            </div>
                                            <div class="profile-header-info">
                                                <h4 class="m-t-10 m-b-5">{channel.name}</h4>
                                                <p class="m-b-10">{channel.email}</p>
                                                <p class="m-b-10">{channel.bio}</p>

                                                <button title="Edit Profile" class="neo-button"><Link to={`/EditProfile/${_id}`}><i id="iconsara" class="fa fa-edit fa-1x"></i> </Link> </button>

                                                </div>
                                        </div>
                                        <ul class="profile-header-tab nav nav-tabs">
                                            <li class="nav-item"><a  class="nav-link active show" data-toggle="tab"></a></li>
                                            <button title="Create new podcast"><Link to='/new'> Podcasts <i  class="fa fa-plus fa-1x"></i> </Link> </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    });
    return (
        <div>
            {/* <Col md="4" sm="4" className="mt-3">
                <Card style={{ width: '18rem' ,textAlign: "center"}} className="property-card">
                    <Card.Img variant="top" src={image} className="property-image" />
                    <Card.Body className="property-description">
                         <Card.Title> {name}</Card.Title>
                         <Card.Subtitle className="mb-2 text-muted">Email: {email} </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Bio: {bio} </Card.Subtitle> 
                         <Link to={`/EditProfile/${_id}`}>    
                       EditProfile
                        </Link> 
                    </Card.Body>
                </Card>
            </Col> */}
           
            <>
                {profaile}
               <div className="pt-2"> { onepodcast && !myallpodcast.length == 0 ? myallpodcast :  <h1  style={{"textAlign":"center","marginTop":"150px"}}>There is no  podcast yet <i id="sad" class="fa fa-frown-o" aria-hidden="true"></i></h1>} </div>
            
            </>
        </div>
    )
}