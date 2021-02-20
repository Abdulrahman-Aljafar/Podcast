import { Route, Redirect, Link, useParams } from "react-router-dom";
import React,{useEffect,useState} from 'react'
import axios from'axios'
import { useHistory } from "react-router-dom";

import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Col, Container, Row } from 'react-bootstrap';


export default function OneCardPodcast(props) {
    const [podcast1, setPodcast1] = useState({})
    const [value1, setValue] = useState(5)
    const [podcast, setpodcast] = useState([])

    const history = useHistory();
    const { id } = useParams()
    const { podId } = useParams()
    console.log(props);
 

   
    // userId

    return (
        <div >
        <Container className="mt-5"  >
            <Row >
                <Col md="6" >
                    <img   src={props.image} alt="" srcset="" />
                </Col>
                <Col md="6" className='infoSowh'>
                <div class='info'>
                    <p style={{fontSize:"20px" }}>
                        <span style={{fontWeight: "bold"
                        }}>
                        {props.title} 
                        </span>
                    </p>
                    <p style={{fontSize:"18px" }}>
                     <span style={{fontWeight: "bold",
                    }}>
                    </span>
                    </p>
                    <p style={{fontSize:"18px" }}>
                     <span style={{fontWeight: "bold"
                    }}>
                    </span>
                    <audio controls  >
            <source src={props.audio}  type="audio/mpeg"/>
          </audio>
                    </p>
                    <p style={{fontSize:"16px" }}>
                     <span style={{fontWeight: "bold"
                    }}>
                        Discription : 
                    </span>
                    {props.description}
                    </p>
                    </div>
                
                   
                    <Link to={`/Allpodcast/${id}/${props.id}`} >
              <button >Read More</button>
           </Link>
                </Col>
            </Row>
        </Container>
  </div>
//         <div>
//                <div class="card mb-3 mt-5 ml-2 " style={{"max-width": "540px" }}>
//   <div class="row g-0">
//     <div class="col-md-4">
//       <img src={props.img} width="200px" height="150px" alt="..."/>
//     </div>
//     <div class="col-md-8">
//       <div class="card-body">
//         <h3 class="card-title">{props.title}</h3>
//         <audio controls  >
//         <source src={props.audio}  type="audio/mpeg"/>
//         </audio>
//          {/* <Link to={`/AddComment/${props.id}`} >
//              <button >AddComment</button>
//           </Link> */}
//           <Link to={`/Allpodcast/${id}/${props.id}`} >
//              <button >Read More</button>
//           </Link>
//       </div>
//     </div>
//   </div>
// </div>
//           </div>
    )
}
