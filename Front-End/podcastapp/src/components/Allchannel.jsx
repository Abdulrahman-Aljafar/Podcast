import React,{useState, useEffect} from 'react'
import Axios from 'axios'
import OneCardChannel from './OneCardChannel'
import API_URL from "./apiConfig"
import TextField from '@material-ui/core/TextField';
import Loading from './Loading'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
export default function Allchannel(props) {
const [channel,setChannnel]=useState([])
const [oneuser,setoneuser]=useState()
const [flag,setFlag]=useState(false)
const [Search,setSearch]=useState('')
    useEffect(() => {
        Axios.get(`${API_URL}/api/users/`)
            .then(res => {
                // console.log(props.data._id)
                console.log("chaneel 111 ",res.data.users)
                setChannnel(res.data.users)

            })

    }, [flag])


    useEffect(() => {
      
        Axios.get(`${API_URL}/api/users/profile/${props.data._id}`)
            .then(res => {
                // console.log(props.data._id)
                console.log("res.data",res.data.user)
                setoneuser(res.data.user)

            })
        
    }, [flag])

    const onChangeInput = (event) => {
        setSearch(event.target.value);
        
      };

      const allchannel = channel.filter((val)=>{
        if(Search == ""){
            return val
        }
        else if(val.name.toLowerCase().includes(Search.toLowerCase())){
            return val
        }
    }).map((channel, i) => {
        return <OneCardChannel key={i} channel= {channel} userid = {props.data._id}  user = {oneuser} setFlag={setFlag} />


    });
console.log("flag",flag)
    return (
        <>
                <div style={{"textAlign":'center'}}>
        <TextField id="standard-search" label="Search field" style={{"width":'500px',"marginBottom":"38px"}} type="search" onChange={(e) => onChangeInput(e)}/>

        </div>
        <div class="container mt-2">
        <div class="row">
           {oneuser && setFlag ?  allchannel : <Loading/>}
            </div>
            </div>
         
        </> 
    )
}
