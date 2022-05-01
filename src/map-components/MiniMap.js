import React, { useRef, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './MiniMap.css'
import { Link, useHistory } from 'react-router-dom';
mapboxgl.accessToken = process.env.REACT_APP_API_KEY;


function MiniMap({ longitude, latitude, location, description, id }) {
  let history = useHistory();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(parseInt(longitude) || 72.8777);
  const [lat, setLat] = useState(parseInt(latitude) || 19.0760);
  const [zoom, setZoom] = useState(15);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('moveend', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  useEffect(() => {
    if (longitude && latitude) {
      map.current.on('load', () => {
        map.current.flyTo({
          center: [longitude, latitude]
        })
      })
    }
  })
  useEffect(() => {
    const marker = new mapboxgl.Marker({
      color: "red",
      draggable: false
    })
    if (latitude && longitude) {
      marker.setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<div style="margin: 10px;">${location}</div>`))
        .addTo(map.current);
    }
  })
  function handleOnClick() {
    map.current.flyTo({
      center: [longitude, latitude]
    })
  }
  function handleOnClickView() {
    history.push(`/map/${id}`);
  }
  return (
    <div className='col-lg-4 d-inline-block mb-3'>
      <Card sx={{ maxWidth: 350 }} >
        <div className="card-img-top d-flex justify-content-center">
          <div ref={mapContainer} className="mini-map-container" />
        </div>
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" >
            <h3 className="card-title">{location || "Poof !! nothing to show here"}</h3>
          </Typography>
          <Typography style={{ textAlign: "left" }} variant="body2" color="text.secondary">
            <p className="card-text">{description || "No description to show!"}</p>
          </Typography>
        </CardContent>

        <CardActions style={{ justifyContent: "center" }}>
          <Button size="large" onClick={handleOnClick} disabled={!(longitude && latitude)}>Reposition</Button>
          <Button size="large" onClick={handleOnClickView} disabled={!(longitude && latitude)} >View</Button>
        </CardActions>
      </Card>

    </div>

  );
}

export default MiniMap;