import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Row, Form, Col, Button, ProgressBar,Spinner } from "react-bootstrap";
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
// import MicRecorder from 'mic-recorder-to-mp3';
import "./CreatePodcast.css";
import MicRecorder from 'mic-recorder-to-mp3';
import API_URL from "./apiConfig"
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export default function CreatePodcast(props) {
  const history = useHistory();
  const [podcast, setPodcast] = useState({});
  const [audio, setaudio] = useState('')
  const [image, setImage] = useState('')
  const [completed, setcompleted] = useState(1)
  const [completed1, setcompleted1] = useState(1)
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadPercentage1, setUploadPercentage1] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show3, setShow3] = useState(false);
  const [isRecording, setisRecording] = useState(false);
  const [isBlocked, setisBlocked] = useState(false);
  const [title11, settitle11] = useState(true);
  const [audio22, setaudio22] = useState(true);
  const[successfully,setsuccessfully] =  useState(true)
  const [blobURL, setblobURL] = useState({});
  const onChangeInput = ({ target: { name, value } }) => {
    setPodcast({ ...podcast, [name]: value, audio: audio, image: image });
  };
  const uploadaudio = async e => {
 const options = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };
    //=========================
    //========================
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    console.log('file', files[0])
    setcompleted(2)
    data.append('upload_preset', 'exoy1fej')
    console.log('data', data)
    axios.post('https://api.cloudinary.com/v1_1/dhuxwxtfm/video/upload', data, options)
      .then(res => {
        console.log("res", res)
        setcompleted(3)
        setUploadPercentage(100);
        setTimeout(() => {
          setUploadPercentage(0);
        }, 1000);
        const file = res.data
        setPodcast({ ...podcast, audio: file.secure_url });
        setaudio(file.secure_url)
      }).catch(err => {
        console.log(err);
        setUploadPercentage(0);
      });
  }
  const uploadImage = async e => {
    const options = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    console.log('file', files[0])
    setcompleted1(2)
    data.append('upload_preset', 'xvn0ezmv')
    axios.post('https://api.cloudinary.com/v1_1/duuconncq/image/upload', data,options)
      .then(res => {
        console.log("res", res)
        setcompleted1(3)
        setUploadPercentage1(100);
        setTimeout(() => {
          setUploadPercentage1(0);
        }, 1000);
        const file = res.data
        
        setPodcast({ ...podcast, image: file.secure_url });
        setImage(file.secure_url)
      }).catch(err => { console.log(err);setUploadPercentage1(0) })
  }
  const onSubmit = (event) => {
    podcast.user = props.data._id;
    event.preventDefault();
    axios.post(`${API_URL}/api/podcast/new`, podcast)
      .then((res) => {
        setsuccessfully(false);
        setTimeout(() => {
            
            history.push("/Profile");
            setsuccessfully(true);
        }, 1500);
      })

      if (!podcast.title) {
        settitle11(false)
        setTimeout(() => {
          settitle11(true);
      }, 3000);
      }
      if (!podcast.audio) {
        setaudio22(false)
        setTimeout(() => {
          setaudio22(true);
      }, 3000);
      }
  };
  const record = () => {
    console.log("Record")
    setShow(true)
    setShow1(false)
  };
  // showupload
  const showupload = () => {
    console.log("Record")
    setShow(false)
    setShow1(true)
  };

  const audiocompleted = () => {
    if (completed == 1) {
      return ("")
    }
    else if (completed == 2) {
      return (<p style={{ "color": "black" }}>not completed Please Wait</p>)
    }
    else {
      return (<p style={{ "color": "black" }}>completed :</p>)
    }
  }
  const imagecompleted = () => {
    if (completed1 == 1) {
      return ("")
    }
    else if (completed1 == 2) {
      return (<p style={{ "color": "black" }}>not completed Please Wait</p>)
    }
    else {
      return (<p style={{ "color": "black" }}>completed :</p>)
    }
  }
  const start = () => {
    setShow3(true)
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setisRecording(true);
        }).catch((e) => console.error(e));
    }
  };
  const stop = () => {
    setShow3(false)
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // const blob = new Blob([binary], {type: 'audio/ogg'});
        console.log("blob", blob)
        const file = new File([blob], "File name", { type: "audio/ogg" })
        const options = {
          onUploadProgress: progressEvent => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            if (percent < 100) {
              setUploadPercentage(percent);
            }
          },
        };
        const data = new FormData()
        data.append('file', file)
        console.log('file', file)
        setcompleted(2)
        data.append('upload_preset', 'exoy1fej')
        console.log('data', data)
        axios.post('https://api.cloudinary.com/v1_1/dhuxwxtfm/video/upload', data, options)
          .then(res => {
            console.log("res", res)
            setcompleted(3)
            setUploadPercentage(100);
            setTimeout(() => {
              setUploadPercentage(0);
            }, 1000);
            const file = res.data
            setaudio(file.secure_url)
            setPodcast({ ...podcast, audio: audio });
          }).catch(err => {
            console.log(err);
            setUploadPercentage(0);
          });
        const blobURL = URL.createObjectURL(blob)
        console.log('From Stop blobURL', blobURL)
        setisRecording(false);
        setblobURL(blobURL);
      }).catch((e) => console.log(e));
  };
  // save
  const save = () => {
    console.log("hi")
    console.log("blobURL", blobURL)
    setaudio(blobURL)
    setPodcast({ ...podcast, audio: audio });
  };
  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setisBlocked(false)
      },
      () => {
        console.log('Permission Denied');
        setisBlocked(false)
      },
    );
  }, [])
  return (
    <div>
      <div className="main22">
        <div className="container-C">
        {!successfully &&(
        <Alert severity="success">Successfully Updated</Alert>
)}
          <form method="POST" className="appointment-form" id="appointment-form">
            <h2 className='h1-C'>Create New Podcast</h2>
            <div class="form-group-1">
              <h5 style={{ "color": "black" }}>Title <span style={{"color":"red"}}>*</span></h5>
              <br />
              {!title11 && (
                <Alert severity="error">
                  Title Must Not Be Empty !!
                </Alert>
              )}
              <Form.Control
                placeholder="Title"
                name="title"
                onChange={(e) => onChangeInput(e)}
              />
              <h5 style={{ "color": "black" }}>Picture Of Podcast</h5>
              <br />
              {/* <input class="input--style-3" type="file" placeholder="Enter Image" name="image" onChange={uploadImage} /> */}
              <div className="form-group">
            <input type="file" className="form-control" name="image" placeholder="Enter Images" onChange={uploadImage} />
            </div>
              {imagecompleted()}
              {uploadPercentage1 > 0 && (
                            <ProgressBar
                              now={uploadPercentage1}
                              striped={true}
                              label={`${uploadPercentage1}%`}
                            />
                          )}
                {!audio22 && (
                <Alert severity="error">
                  Audio Must Not Be Empty !!
                </Alert>
              )}

                          
              <h5 style={{ "color": "black" }}>Upload Your Podcast <span style={{"color":"red"}}>*</span></h5>
              <br />

              
              <br />
              <Button id="butt1" onClick={record} 
              >
               <i id ="up" class="fa fa-microphone" aria-hidden="true"></i>
            </Button>
            <Button id="butt1" onClick={showupload} 
              >
               <i id ="up" class="fa fa-upload" aria-hidden="true"></i>
            </Button>
            {show1 &&     <div>
                          {/* <input class="input--style-3" type="file" placeholder="Enter audio" name="audio" onChange={uploadaudio} /> */}
                          <div className="form-group">
            <input type="file"  className="form-control" name="audio" placeholder="Upload" onChange={uploadaudio} />
            </div>
                          {audiocompleted()}
                          {uploadPercentage > 0 && (
                            <ProgressBar
                              now={uploadPercentage}
                              striped={true}
                              label={`${uploadPercentage}%`}
                            />
                          )}
                          </div>
            }
              {show &&
                <div className="App">
                  <header className="App-header">
                    <Button id="but3" onClick={start} disabled={isRecording}>Record{show3 &&  <Spinner animation="grow" className="spi" variant="danger" />}</Button>
                    
                    <audio src={blobURL} controls="controls" />
                    <br />
                    {/* <Button onClick={save}>
                      Save record
                 </Button> */}
                 <Button id="but3" onClick={stop} disabled={!isRecording}>Stop And Save</Button>
                  </header>
                </div>
              }

              <h5 style={{ "color": "black" }}>Description</h5>
              <br />
              <Form.Control
                name="description"
                placeholder="Description"
                onChange={(e) => onChangeInput(e)}
                as="textarea" rows={3} />
            </div>
            <br />
            <div className="form-submit">
              <input style={{"color":"white"}} type="submit" name="submit"  id="but"   value="Submit" onClick={(e) => onSubmit(e)} />
            </div>
          </form>
        </div>
      </div>
      {/* <div>
                <input style={{'color':"black"}}  type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label  style={{'color':"black"}} for="vehicle1"> I have a bike</label><br />
                <input style={{'color':"black"}}  type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label style={{'color':"black"}}  for="vehicle2"> I have a car</label><br />
              </div> */}
      {/* <Form className="mt-5">
        <Row className="justify-content-center mt-5">
          <Col md={15}>
            <Form.Row>
              <Col md={6}>
                <Form.Label><p className="m-b-10 f-w-600">Title Of Podcast</p></Form.Label>
                <Form.Control
                  placeholder="Title"
                  name="title"
                  onChange={(e) => onChangeInput(e)}
                />
              </Col>
              <Col md={6}>
                <Form.Label><p className="m-b-10 f-w-600">Picture Of Podcast</p></Form.Label>
                <input class="input--style-3" type="file" placeholder="Enter Image" name="image" onChange={uploadImage} />
                {imagecompleted()}
              </Col>
              <Form.Row>
                <Col md={6}>
                  <input class="input--style-3" type="file" placeholder="Enter audio" name="audio" onChange={uploadaudio} />
                </Col>
                {audiocompleted()}
              <Col md={6}>
              <Link to={`/record`} >
                <Button variant="outline-info" 
              type="submit"
            >
              Record
            </Button></Link>
              </Col>
              </Form.Row>
            </Form.Row>
            <Col md={6}>
            {uploadPercentage > 0 && (
              <ProgressBar
                now={uploadPercentage}
                striped={true}
                label={`${uploadPercentage}%`}
              />
            )}
            </Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label><p className="m-b-10 pt-4 f-w-600">Description</p></Form.Label>
                <Form.Control
                  //   type="email"
                  placeholder="Description"
                  name="description"
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>
            </Form.Row>
            <Link >
              <Button variant="outline-info"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                Submit
            </Button>
            </Link>
          </Col>
        </Row>
      </Form> */}
    </div>
  );
}