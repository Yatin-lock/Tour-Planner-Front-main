import React ,{createContext,useEffect,useState} from 'react';
import axios from 'axios';

export const myContextlocal=createContext({});

export default function ContextLocal(props){

const [userObject,setUserObject]=useState();

useEffect(()=>{

axios.get("http://localhost:4000/getuser",{withCredentials:true}).then((res)=>{
    if(res.data){
     setUserObject(res.data);
    }
})
},[])

    return(
  <myContextlocal.Provider value={userObject}>{props.children}</myContextlocal.Provider>
    )
}