import React,{useEffect,useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import { useParams } from 'react-router-dom';
import Axios from'axios'
import { Col, Container, Row } from 'react-bootstrap';
import { Box } from '@material-ui/core';

function calcAvrg(array){
    
    if(!array) return 0 
     const sum = array.reduce((sum , num)=>{
      return sum + num  
     },0)
     if(array.length == 0 ) return 0 
     else return (sum/array.length)
     
     
 }
export default function Showpodcast(props) {
    const { id } = useParams()
    console.log(id)
    const [podcast1, setPodcast1] = useState({})
    const [podcast, setPodcast] = useState([])
    const [value1, setValue] = useState(5)
    const onChangeInput = (newrate) => { 
        setPodcast1({rate:newrate} )
        
            
            
    }; 
    useEffect(() => {
        console.log("podcast1",podcast1)
        updateRating()
        
    }, [podcast1])
    
useEffect(() => {
    Axios.get(`http://localhost:4000/api/podcast/`)
        .then(res => {
            console.log("rrrrrrrrrrrr")
            console.log(res.data.podcast)
            setPodcast(res.data.podcast)

        })

}, [])





const updateRating =() => {
    let podcastId = id;
    // edit book rating
    console.log("before Axios")
    Axios
        .post(`http://localhost:4000/api/podcast/addrating/${podcastId}`, podcast1)
        .then((res) => {
            console.log("res.data.user from profile update: ", res.data.podcast)
        }) .catch((err) => console.log(err));
};









 let onePodcast= podcast.map((podcast)=>{


    if (podcast._id == id){
return(
        <div >
        <Container className="mt-5"  >
            <Row >
                <Col md="6" >
                    <img   src={podcast.image} alt="" srcset="" />
                </Col>
                <Col md="6" className='infoSowh'>
                <div class='info'>
               
                    <p style={{fontSize:"20px" }}>
                        <span style={{fontWeight: "bold"
                        }}>
                        {podcast.title} 
                        </span>
                    
                    </p>

                    <p style={{fontSize:"18px" }}>
                     <span style={{fontWeight: "bold",
                    
                    }}>
                        podcast Rating : 
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
                            console.log("Abdulrahman ",newValue)
                         setValue(newValue);
                         onChangeInput(newValue);
                        
                         
                       }}

                            />
                    </Box>
                    {/* <span style={{fontSize:"18px",
                    color: "yellowgreen" }}>{calcAvrg(selectBook.brate)}</span>/5 */}
                    </p>

                    <p style={{fontSize:"18px" }}>
                     <span style={{fontWeight: "bold"
                    }}>
                        
                    </span>
                    <audio controls  >
            
            <source src={podcast.audio}  type="audio/mpeg"/>
            
          </audio>
                    </p>

                    <p style={{fontSize:"16px" }}>
                     <span style={{fontWeight: "bold"
                    }}>
                        Discription : 
                    </span>
                    {podcast.description}
                    </p>




                    </div>

                </Col>
            </Row>
        </Container>
  </div>
)

    }
})
    return (
        <div>
{onePodcast}

        </div>
    )
}
