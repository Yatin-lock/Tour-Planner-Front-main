import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Axios from 'axios';
import '../css/Location.css'
import LocationCard from './LocationCard';
function Location(){
    const params  = useParams();
    const [location,setLocation] = useState({});
    const [ratings,setRating] = useState([]);
    const getLoc=()=>{
        Axios({
            method:"POST",
            withCredentials:true,
            data:{
                id:params.id
            },
            url:"http://localhost:4000/getLoc"
        })
        .then((res)=>{
            setLocation(res.data.data.loc)
            console.log(location);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getLoc();
    },[])
    return(
        <div className ="row col-lg-11 col-sm-12">
            <LocationCard name={location.name} description={location.description} id = {location.id} />
        </div>
    )
}   

export default Location