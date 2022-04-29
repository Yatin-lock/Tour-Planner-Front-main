import React, { useRef, useEffect, useState }from 'react'
import Axios from 'axios';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from 'mapbox-gl-geocoder';
import MiniMap from './MiniMap'
import './MapContainer.css'
mapboxgl.accessToken = process.env.REACT_APP_API_KEY;

function Map(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(72.8777);
  const [lat, setLat] = useState(19.0760);
  const [zoom, setZoom] = useState(9);
  const [availableLocs , updateLocs] = useState([])
  // var locations=loc;
  const[locations,setLocations] = useState([]);
  const [getLocs, updateGetLocs] = useState(false)
  const [isAddLoc,setAddLoc] = useState(false)
  const [locName,setLocName] = useState("");
  const[desc,setDesc]  = useState("");
  function distanceLatLongToKM(lat1,lat2, lon1, lon2){
  lon1 =  lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
  + Math.cos(lat1) * Math.cos(lat2)
  * Math.pow(Math.sin(dlon / 2),2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;
  return(c * r);
}
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
  useEffect(()=>{
    async function getData(){
      await Axios({
        method:"POST",
        withCredentials:true,
        url:"http://localhost:4000/getLocs"
      })
      .then((res)=>{
        setLocations(res.data);
        // console.log(1,locations);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    getData();
  },[])
  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(geolocate);
    map.current.on('load', () => {
        if(navigator.geolocation){
        navigator.permissions
        .query({name:"geolocation"})
        .then(function(result){
          if(result.state==="granted"){
            geolocate.trigger();
          }
          else if(result.state==="prompt"){
            navigator.geolocation.getCurrentPosition(function(e){
                if(e){
                  geolocate.trigger();
                }
            });
          }
          else if(result.state === "denied"){
            navigator.geolocation.getCurrentPosition(function(e){
            })
          }
        })
        
        }
    })
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: process.env.REACT_APP_API_KEY,
        mapboxgl: mapboxgl
      })
    )
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('moveend', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });
    function handleClickLocs(e){
      updateGetLocs(true);
      let numLocs = 0;
      async function getData(){

      }
      // console.log(locations)
      const locs = locations.filter(location=>{
        if(distanceLatLongToKM(parseFloat(lat),location.geometry.coordinates[0],parseFloat(lng),location.geometry.coordinates[1])<=10 && numLocs<6){
          numLocs++;
          return true;
        }
        return false
      })
      while(numLocs<6){
        locs.push({name: null, geometry:{type: null,coordinates:[null,null]}})
        numLocs++;
      }
      updateLocs(locs);
    }
    function handleClickAddLoc(e){
      setAddLoc(!isAddLoc)
    }   
    function handleChange(e){
      setLocName(e.target.value);
    }
    function handleChangeDesc(e){
      setDesc(e.target.value);
    }
    function handleSubmit(e){
      e.preventDefault();
      Axios({
        method:"POST",
        withCredentials:true,
        data:{
          location: locName,
          geometry:{
            type:'Point',
            coordinates:[lng,lat],
          },
          description:desc
        },
        url:"http://localhost:4000/add/locations"
      })
      .then(res=>{
        if(res.data.authenticated){
          
        }else{
          // console.log(res.data.msg);
        }
      })
      setLocName("");
      setDesc("");
      setAddLoc(false);
    }
    // a component did update for map movend method future dev
  function availablePlaces(locs){
    return(
        <div className="row col-lg-11 col-sm-12">
          {locs.map(location=>{
            return(
              <MiniMap 
              longitude={location.geometry.coordinates[1]} 
              latitude={location.geometry.coordinates[0]}
              location={location.name}
              description={location.description}
              id={location.id}
              >
              </MiniMap>
            )
          })}
        </div>
    )
  }
  return (
    <div className="d-flex justify-content-center">
      <div>
        <div className="MapContainer">
          <div ref={mapContainer} className="map-container"/>
        </div>
        <div className="ml-3">
          <div>
            <button onClick={handleClickLocs} disabled={getLocs} className="ml-md-0 ml-sm-0" >Get Locations</button>
          </div>
          <div>
            <a  href="/map" className="ml-0">Want to search for another location? Click here to get fresh locations</a>
          </div>
        </div>

        <div className="d-flex justify-content-center row">
          {getLocs && availablePlaces(availableLocs)}
        </div>
        <div>
        {!isAddLoc&&<button onClick={handleClickAddLoc} >Refer your current location</button>}
        {isAddLoc&&
          <div>
            <form>
              <input type="text" placeholder="lattitude" disabled value={lat}/>
              <input type="text" placeholder="longitude" disabled value={lng}/>
              <input type="text" placeholder="location name" onChange={handleChange} value={locName}/>
              <input type="text" placeholder="description" onChange={handleChangeDesc} value={desc}/>
              <input type="submit" onClick={handleSubmit}/>
            </form>
          </div>
        }
        </div>
      </div>
    </div>
  );
  }

export default Map;