import axios from 'axios'
import { Route, Redirect, Link, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Col, Container, Row } from 'react-bootstrap';
import API_URL from "./apiConfig"
import Alert from '@material-ui/lab/Alert';
import './showone.css'
function calcAvrg(array) {
    if (!array) return 0
    const sum = array.reduce((sum, num) => {
        return sum + num
    }, 0)
    if (array.length == 0) return 0
    else return (sum / array.length)
}
export default function SowOnePodcast(props) {
    const { podId } = useParams()
    const { id } = useParams()
    const history = useHistory();
    const [value1, setValue] = useState(5)
    const [podcast, setpodcast] = useState([])
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState([]);
    const [podcast1, setPodcast1] = useState({})
    const [flag, setFlag] = useState(false)
    const [onepodcast, setOnePodcast] = useState()
    const [chaeckcomment, setChaeckComment] = useState(true);


    console.log('id', id)
    console.log('podId', podId)
    useEffect(() => {
        axios.get(`${API_URL}/api/podcast/`)
            .then(res => {
                console.log(res.data.podcast)
                let podcast = res.data.podcast.find(ele => ele._id == podId)
                console.log(podcast)
                setpodcast(podcast)
            })
    }, [flag])
    useEffect(() => {
        axios.get(`${API_URL}/api/podcast`)
            .then(res => {
                // console.log(props.data._id)
                console.log("res.data", res.data.user)
                setOnePodcast(res.data.podcast)

            })

    }, [flag])

    
    const deleteComment = (ele) => {
        console.log(ele)
        axios.delete(`${API_URL}/api/podcast/deletedComment/${podcast._id}/${ele}`)
            .then(data => {
                console.log("data", data)
                // We need to refresh page
                // history.push(`/Allpodcast/${id}/${podcast._id}`);
                // window.location.reload(false);
            }).catch((err) => console.log(err));
        setFlag(p => !p)
    }
    const deletePodcast = () => {
        axios.delete(`${API_URL}/api/podcast/deletePodcast/${podcast._id}`)
            .then(data => {
                console.log("data", data)
                history.push(`/Allpodcast/${id}`);
            })
        setFlag(p => !p)
    }
    const onChangeInput = (newrate) => {
        setPodcast1({ rate: newrate });
    };
    const updateRating = () => {
        let podcastId = podId;
        // edit book rating
        console.log("before Axios")
        axios
            .post(`${API_URL}/api/podcast/addrating/${podcastId}`, podcast1)
            .then((res) => {
                console.log("res.data.user from profile update: ", res.data.podcast)
            }).catch((err) => console.log(err));
    };
    useEffect(() => {
        console.log("podcast1", podcast1)
        updateRating()
    }, [podcast1])
    const onChangeInput1 = ({ target: { name, value } }) => {
        setComment({ ...comment, [name]: value });
      };
    // const AddComment = (event) => {
    //     console.log("Add")
    //     event.preventDefault();
    //     axios.post(`${API_URL}/api/podcast/AddComment/${podId}`, comment)
    //         .then((res) => {
    //             console.log("data", res)
                // history.push(`/Allpodcast/:id/${podId}`);
            // })
            // window.location.reload(false);
            // setFlag(p => !p)
            // setShow(false)
    // };
    const AddComment = (event) => {

        console.log("Add  comment" ,comment)

        if(!comment.comment==''){
        console.log("Not Empty  comment" ,comment)
        
        event.preventDefault();
        axios.post(`${API_URL}/api/podcast/AddComment/${podId}`, comment)
            .then((res) => {
                console.log("data", res)
                // history.push(`/Allpodcast/:id/${podId}`);
            })
            // window.location.reload(false);
            setFlag(p => !p)
            setShow(false)
            setComment({ comment: '' });

        }
        else 
        {
        setChaeckComment(false)
      
        setTimeout(() => {
        setChaeckComment(true)
      }, 3000);


        }
    };

    const sh = () => {
       setShow(true)
    };
    const allComment = podcast.length == 0 ? '' : podcast.comment.map((ele) => {
        console.log("comment", ele)
        // return <div> {ele} {podcast.user == props.user._id && <button variant="outline-info" onClick={() => deleteComment(ele)} className="outline-light" >delete </button>} </div>
        return(
                <div class="comments">
                <div class="comment" >
                  <a class="comment-img" href="#non">
                    <img src={podcast.image} alt="" width="50" height="50"/> 
                  </a>
                  <div class="comment-body">
                    <div class="text">
                    <p>{ele}</p>{podcast.user == props.user._id &&<button id="deletebutt"variant="outline-info" onClick={() => deleteComment(ele)} className="outline-light" ><i id="deletebutt"class="fa fa-trash-o" aria-hidden="true"></i> </button>}
                    </div>
                  </div>
                </div>
               </div>
        )
    })
    return (
        <>
        <div >
            <Container className="mt-5"  >
                <Row >
                    <Col  md="6" >
                        <img src={podcast.image}  alt="" srcset=""  class="img img-responsive "/>
                        <Button id="butt"onClick={sh} title="Add Comment">AddComment </Button>
                        {!chaeckcomment && 
                                       ( <Alert severity="error">
                                          Comment Must Not Be Empty
                                        </Alert>)
                                      }

                            {show && <div>
                                <div id="inputcomment" class="form-group" >
                                
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add Comment..."
                                    name="comment"
                                    onChange={(e) => onChangeInput1(e)}></textarea>
                                    <Button id="butt" title="Post Comment" onClick={(e) => AddComment(e)}>Send</Button></div>
                                    </div>
                            }
                    </Col>
                    <Col md="6" >
                        <div class='info'>
                            <p style={{ fontSize: "20px" }}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>
                                    {podcast.title}
                                </span>
                            </p>
                            <p style={{ fontSize: "18px" }}>
                                <span style={{
                                    fontWeight: "bold",
                                }}>
                    </span>
                                <Box
                                 component="fieldset" 
                       mb={3} 
                       borderColor="transparent"> 
                                 <Rating 
                           name="hover-feedback"
                           value={calcAvrg(podcast.rate)}
                           precision={0.5}
                          onChange={(event, newValue) => {
                            console.log("2",newValue)
                         setValue(newValue);
                         onChangeInput(newValue);
                       }}
                            /> 
                                 </Box> 
                            </p>
                            <p style={{ fontSize: "18px" }}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>
                                </span>
                                {/* <audio controls  >
                                    <source src={podcast.audio} type="audio/mpeg" />
                                </audio>  */}
                                <audio src={podcast.audio} controls="controls" />
                            </p>
                            <p style={{ fontSize: "16px" }}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>
                                    {/* Discription : */}
                    </span>
                                {podcast.description}
                            </p>
                            <div className="pt-2"> {
                            // !allComment.length == 0 ?
                            //     allComment :
                            //     <p>There is no comment yet</p>
                            onepodcast ? allComment : <h1>Loding..</h1>

                            } </div>
                        </div>
                        {/* <button variant="outline-info" onClick={() => deletePodcast()} className="outline-light " >delete Podcast </button> */}
                    </Col>
                </Row>
            </Container>
        </div>
</>
    )
}