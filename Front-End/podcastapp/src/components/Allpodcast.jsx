import React ,{useEffect,useState}from 'react'
import { Route, Redirect, Link, useParams } from "react-router-dom";
import Axios from 'axios'
import Rating from '@material-ui/lab/Rating';
import API_URL from "./apiConfig"
import"./allpodcast.css"

function calcAvrg(array){
    if(!array) return 0 
     const sum = array.reduce((sum , num)=>{
      return sum + num  
     },0)
     if(array.length == 0 ) return 0 
     else return (sum/array.length)
     
 }
export default function Allpodcast(props) {
    const {id} = useParams()
    console.log(" id test ",id)
const [podcast, setpodcast] = useState([])
    // useEffect(() => {
    //     Axios.get(`${API_URL}/api/podcast/`)
    //         .then(res => {
    //             // console.log(props.data._id)
    //             console.log(res.data.podcast)
    //             setpodcast(res.data.podcast)

    //         })

    // }, [])


    // useEffect(() => {
    //     Axios.get(`${API_URL}/api/podcast/${props.data._id}`)
    //         .then(res => {
    //             // console.log(props.data._id)
    //             console.log(res.data.podcast)
    //             setpodcast(res.data.podcast)
    //         })
    // }, [])
    useEffect(() => {
        Axios.get(`${API_URL}/api/podcast/${id}`)
            .then(res => {
                // console.log(props.data._id)
                console.log(res.data.podcast)
                setpodcast(res.data.podcast)
            })
    }, [])
    
    console.log("podcast" , podcast)
    console.log("idpodcast" , props.data._id)
    const test=()=>{
        console.log("test5555555")
    }
   

    // let podcast = res.data.msg.find(ele => ele._id == id)
    let allpodcast = podcast.map((podcast, i) => {
        if(id == podcast.user){
            
        // return (<div>
        // <h1>{podcast.title}</h1>
        //     <audio controls  >
            
        //     <source src={podcast.audio} onClick={test()} type="audio/mpeg"/>
            
        //   </audio>
        //   </div>)
        return(
          <>


<div class="col-md-4">

    <Link to = {`/Allpodcast/${id}/${podcast._id}`}>
    <div class="profile-card-6"><img src={podcast.image} class="img img-responsive"/>
       
        <div class="profile-position">{podcast.title}</div>
        <div class="profile-overview">
            <div class="profile-overview">
                <div class="row text-center">
                
                    <div class="col-xs-4">
                        {/* <h3>1</h3>
                        <p>Rate</p> */}
                         <audio controls id="audio" >
                 <source src={podcast.audio}  type="audio/mpeg"/>
                           </audio> 
         {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
  <path fill-rule="evenodd" d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
</svg> */}
      
                    </div>
                    <div class="col-xs-4">
                        {/* <h3>50</h3> */}
                        <p>rate</p>
                    </div>
                    <div class="col-xs-4">
                    <Rating    
                               name="read-only" 
                               value={calcAvrg(podcast.rate)}
                               precision={0.5}
                               readOnly />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Link>
</div>



</>
        )
         
        }
    });
    return (


        <div class="container mt-2">
<div class="row">
{!allpodcast.length == 0 ? allpodcast : <h1  style={{"textAlign":"center","marginTop":"150px"}}>There is no  Podcast Yet <i id="sad" class="fa fa-frown-o" aria-hidden="true"></i></h1>}

            </div>
            </div>
//         <div class="col-lg-9">
/* <div class="container mt-2">
<div class="row">
            
            <div className="pt-2"> {!allpodcast.length == 0 ?
                                allpodcast :
                                <h1  style={{"textAlign":"center","marginTop":"150px"}}>There is no  podcast yet <i id="sad" class="fa fa-frown-o" aria-hidden="true"></i></h1>
                            } </div>
            </div>
            </div> */
//             <div class="card mb-3 mt-5 ml-2 " style={{"max-width": "540px" }}>
//   <div class="row g-0">
//     <div class="col-md-4">
//       <img src="https://res.cloudinary.com/duuconncq/image/upload/v1613035330/sgus0wtsv8g9traoznz5.jpg" width="200px" height="150px" alt="..."/>
//     </div>
//     <div class="col-md-8">
//       <div class="card-body">
//         <h3 class="card-title">Card title</h3>
//         <audio controls  >
//         <source src=""  type="audio/mpeg"/>
//         </audio>
//       </div>
//     </div>
//   </div>
// </div>
            
//         </div>
    
    )
}