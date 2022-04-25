import React,{Component} from 'react';
import  { useRef, useEffect, useState } from 'react';
import '../css/Map.css';
import ReactMapGL from 'react-map-gl';

 const accessToken = 'pk.eyJ1Ijoic2hvcnlhMTgxOCIsImEiOiJja3RnMzhzZ2YwZWE3Mm5tdWFxY2VvZnptIn0.E-Vp4mQcmUZWVzQ-r6HhAg';




export default function Map(){

    const [viewport,setViewport] = useState({
        latitude:42.35,
        longitude:-70.9,
        width:"800px",
        height:"200px",
        zoom:10
    });
    

        return(
            <div>
            <div className="map-1">
               
            <ReactMapGL {...viewport} mapboxApiAccessToken={accessToken}
         
            >
       Marker Here
            </ReactMapGL>
            
            <div className="text-div">
                 <h1>Singapore</h1>
                 <p>it is a long established fact that a reader will be distracted by the readable content of a page
                      when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                       distribution of letters</p>
            </div>
           
            </div>

            <div className="map-1">
            <div className="text-div">
                    <h1>Singapore</h1>
                    <p>it is a long established fact that a reader will be distracted by the readable content of a page
                         when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                          distribution of letters</p>
               </div>
               <ReactMapGL {...viewport} mapboxApiAccessToken={accessToken}
            
               >
          Marker Here
               </ReactMapGL>
               
             
              
               </div>

               <div className="map-1">
               
               <ReactMapGL {...viewport} mapboxApiAccessToken={accessToken}
            
               >
          Marker Here
               </ReactMapGL>
               
               <div className="text-div">
                    <h1>Singapore</h1>
                    <p>it is a long established fact that a reader will be distracted by the readable content of a page
                         when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                          distribution of letters</p>
               </div>
              
               </div>
            </div>
        )
    
}

