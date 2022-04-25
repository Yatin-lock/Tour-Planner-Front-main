import Map from './Map'
import  Axios  from 'axios';
import { useEffect, useState } from 'react'; 
function MapContainer(){
    const [isLoggedIn,setisLoggedIn] = useState(false); 
    async function getUser(){
        await Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:4000/getUser"
        })
        .then(res=>{
          setisLoggedIn(res.data.loggedIn);
          console.log(isLoggedIn);
        })
        .catch(err=>{
          console.log(err);
          setisLoggedIn(false);
        })
      }  
      useEffect(()=>{
        getUser();
    },[])
    return(
        <div>
            {isLoggedIn&& <Map></Map>}
        </div>

    )
}

export default MapContainer