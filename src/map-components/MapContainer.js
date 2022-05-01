import Map from './Map'
import  Axios  from 'axios';
import { useEffect, useState } from 'react'; 
import LoginNav from '../components/LoginNav';
import LoginToCont from '../Error/LoginToCont';
function MapContainer(){
    const [isLoggedIn,setisLoggedIn] = useState(false); 
    const [user,setUser] = useState("test");
    async function getUser(){
        await Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:4000/getUser"
        })
        .then(res=>{
          setisLoggedIn(res.data.loggedIn);
          setUser(res.data.user);
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
          <LoginNav user={user} ></LoginNav>
            {isLoggedIn&& <Map user={user}></Map>}
            {!isLoggedIn&& <LoginToCont/>}
        </div>

    )
}

export default MapContainer