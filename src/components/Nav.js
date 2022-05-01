import React from 'react';
import { useState } from 'react';
import '../css/nav.css';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom'

function Nav() {
  let history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/auth/logout"
    }).then(res => {
      if (res.data.authenticated)
        history.push('/login');
      else {

      }
    }).catch(err => {
      console.log(err);
    })
  }
  const [isActive, setActive] = useState(true);
  const toggleClass = () => {
    setActive(!isActive);

  };

  return (
    <div>
      <nav class="nav " style={{ width: "75%" }}>
        <div class="container">
          <div class="logo">
            <a>Your Logo</a>
          </div>
          <div id="mainListDiv" className={isActive ? "main_list" : "show_list "}>
            <ul class="navlinks">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/map">Map</Link></li>
            </ul>
          </div>
          <span className={isActive ? "navTrigger" : "active navTrigger"} onClick={toggleClass}>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>
      </nav>
      <section class="home">
      </section>
    </div>
  )

}

export default Nav;