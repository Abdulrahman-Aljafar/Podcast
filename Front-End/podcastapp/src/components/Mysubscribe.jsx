import React,{useState,useEffect} from 'react'
import axios from 'axios'
import API_URL from "./apiConfig"
import OneCardChannel from './OneCardChannel'
import Loading from './Loading'

export default function Mysubscribe(props) {
    const [subchannel, setSubchannel] = useState([])
    const [oneuser, setoneuser] = useState()
    const [flag,setFlag]=useState(false)
    const [check, setcheck] = useState(false)
    useEffect(
     async () => {
        let getUser = await axios.get(`${API_URL}/api/users/profile/${props.data._id}`)
        setoneuser(getUser.data.user)
        // console.log('get profile', getUser.data.user)
        axios.get(`${API_URL}/api/users/`)
          .then(res => {
            console.log(">>>>>>> props.user.: ", res)
            const favorite = res.data.users.filter(sub => getUser.data.user.subscribe.includes(sub._id));
            setSubchannel(favorite)
            // console.log("sub ",favorite)
          })
      }
      , [flag])



    
       


         console.log("subchannel",oneuser)
      let sub1=subchannel.map((channel,i)=>{
            return <OneCardChannel key={i} channel= {channel} userid = {props.data._id}  user = {oneuser} setFlag={setFlag} />
        })

        // if(oneuser != ""){
        //     setcheck(true)
        // }


      
    return (
        <div>
              <div class="container mt-2">
           <div class="row">
           { oneuser && !sub1.length == 0 ? sub1 : <h1  style={{"textAlign":"center","marginTop":"150px"}}>There is no  Subscribe Channel yet <i id="sad" class="fa fa-frown-o" aria-hidden="true"></i></h1>
             }
           
            </div>
            </div>
        </div>
    )
}
