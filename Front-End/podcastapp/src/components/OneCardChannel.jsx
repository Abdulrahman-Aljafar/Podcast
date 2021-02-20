import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";
import './onecard.css'
import API_URL from "./apiConfig"

export default function OneCardChannel(props) {



    // const { id } = useParams()
    const [isFave, setIsFave] = useState(false)
    const [channel,setChannnel]=useState([])
    const [flagone,setFlagone]=useState(false)
    const [oneuser,setoneuser]=useState()
    const [flag,setFlag]=useState(false)
 


    const { name,email, image, bio,_id,Mysubscribe,subscribe} = props.channel


    
    useEffect(() => {
        axios.get(`${API_URL}/api/users/`)
            .then(res => {
                // console.log(props.data._id)
                console.log("chaneel 111 ",res.data.users)
                setChannnel(res.data.users)

            })

    }, [flag])



    useEffect(() => {
      
        axios.get(`${API_URL}/api/users/profile/${props.userid}`)
            .then(res => {
                // console.log(props.data._id)
                console.log("res.data",res.data.user)
                setoneuser(res.data.user)

            })
        
    }, [flag])

    const sub = (id)=>{
        axios
        .post(`${API_URL}/api/users/sub/${id}/${props.userid}`)
        .then((res) => {
            console.log("res.data.user from profile update: ", res.data.user)
        }) .catch((err) => console.log(err));
        // setIsFave(true)

        axios
        .post(`${API_URL}/api/users/Mysub/${id}/${props.userid}`)
        .then((res) => {
            console.log("res.data.user from profile update: ", res.data.user)
        }) .catch((err) => console.log(err));

        props.setFlag(p=>!p)
       
    }

    const unsub = (id)=>{
        axios
        .post(`${API_URL}/api/users/unsub/${id}/${props.userid}`)
        .then((res) => {
            console.log("res.data.user UNSUB method: ", res.data.user.subscribe)
        }) .catch((err) => console.log(err));
        // setIsFave(false)

        axios
        .post(`${API_URL}/api/users/Myunsub/${id}/${props.userid}`)
        .then((res) => {
            console.log("res.data.user UNSUB method: ", res.data.user.subscribe)
        }) .catch((err) => console.log(err));

        props.setFlag(p=>!p)
        setFlagone(p=>!p)
    }
    return (
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="image-flip" >
                            <div class="mainflip flip-0">
                                <div class="frontside">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <p><img class=" img-fluid" src={image} alt="card image"/></p>
                                            <h4 class="card-title">{name}</h4>
                                            <h3>Subscribers :  {oneuser  ?  Mysubscribe.length : <h3>Loading...</h3>}</h3>
                                            <p class="card-text"></p>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="backside">
                                    <div class="card">
                                        <div class="card-body text-center mt-4">
                                            <h4 class="card-title">{name}</h4>
                                            <p class="card-text">{bio}</p>
                                            
                                            {/* <ul class="list-inline">
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-facebook"></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-skype"></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-google"></i>
                                                    </a>
                                                </li>
                                            </ul> */}
                                            <div style={{"marginTop":"20px"}}>
                                            {props.user.subscribe.includes(_id) ? <button title="UnSubscribe" class="neo-button" onClick={()=>{unsub(_id)}}><i id="Sub" class="fa fa-minus" aria-hidden="true"></i> </button> : <button title="Subscribe" class="neo-button" onClick={()=>{sub(_id)}}><i id="Sub" class="fa fa-plus fa-1x"></i> </button>}
                                            
                                            <button title="Show All Podcast" class="neo-button"><Link to={`/Allpodcast/${_id}`}><i class="fa fa-arrow-circle-up"></i> </Link></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}