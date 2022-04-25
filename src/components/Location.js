import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Axios from 'axios';
import '../css/Location.css'
import FlashMessage from 'react-flash-message'
function Location(){
    const params  = useParams();
    const [location,setLocation] = useState({});
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
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getLoc();
    },[])
    return(
        <div>
            <FlashMessage duration={5000} persistOnHover={true}>
                <div>
                    Message
                </div>
            </FlashMessage>
        </div>
    )
}   

export default Location