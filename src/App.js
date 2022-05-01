import MapContainer from './map-components/MapContainer'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
// import {myContext} from  './contexts/AuthContext';
// import React,{useContext, useEffect} from  'react';
import Location from './components/Location';
// import Axios  from 'axios';
import './App.css'
function App() {
  // const userObject=useContext(myContext);
 
  return (

    <Router>
    <div className="App">
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/map" render={()=><MapContainer/>}/>
    <Route exact path = "/map/:id" render={()=><Location lng={72.8777} lat={19.0760}/>}/>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
