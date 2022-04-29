import React, { useState } from "react";
import "../css/Register.css";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from "@mui/material";

function Register() {
  let history = useHistory();
  const [email, ChangeEmail] = useState("");
  const [password, ChangePassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [auth, setAuth] = useState(true);
  const paperStyle = { padding: 20, height: '70vh', width: 320, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  function onChangeEmail(e) {
    ChangeEmail(e.target.value);
    if (validateEmail(email))
      setIsValidEmail(true);
    else setIsValidEmail(false);
  }
  function onChangePassword(e) {
    ChangePassword(e.target.value);
  }

  function handleClose() {
    setAuth(true);
  }
  function onSubmit(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    axios.post("http://localhost:4000/register", { user })
      .then((res) => {
        console.log(res.data);
        if (res.data.authenticated) {
          alert("user registered redirecting to login page");
          history.push('/login')
        }
        else {
          setAuth(false);
        }
      })
      .catch((err) => console.log(err));
    ChangeEmail("");
    ChangePassword("");

  }

  const googleLogin = () => {
    window.open("http://localhost:4000/auth/google", "_self")
  }

  return (
    <div className="login-pages">
      <div className="d-flex flex-column ">
        <Grid className="login-form">
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center' style={{paddingTop:"50px"}}>
              <Avatar style={avatarStyle}></Avatar>
              <h2>Sign Up</h2>
            </Grid>
            <TextField label='Email' placeholder='Enter username' fullWidth required onChange={onChangeEmail}
              error={!isValidEmail} helperText={!isValidEmail && "Type Correct Email address"}
            />
            <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={onChangePassword} />
            <Button type='submit' onClick={onSubmit} color='primary' variant="contained" style={btnstyle} fullWidth disabled={!isValidEmail}>Sign Up</Button>
            <Typography > Do you have an account ?
              <Link to="/Login" >
                Log In
              </Link>
            </Typography>
            <Typography >
              <Link to="/" >
                Go back to home page
              </Link>
            </Typography>
          </Paper>
        </Grid>
        <Snackbar
          open={!auth}
          autoHideDuration={6000}
          onClose={handleClose}
          message="User with email already registered"
          action={action}
        >
          <Alert severity="error">User already registered</Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Register;
