import React, { useEffect, useState } from "react";
import "../css/Login.css";
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert } from "@mui/material";
// import Avatar from '@mui/material/Avatar';
// import LockOutlinedIcon from '@mui/icons/LockOutlined';

function Login() {
  const [email, ChangeEmail] = useState("");
  const [password, ChangePassword] = useState("");
  const [auth, setAuth] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const paperStyle = { padding: 20, height: '70vh', width: 320, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  let history = useHistory();
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
  function onSubmit(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    ChangeEmail("");
    ChangePassword("");
    Axios.defaults.withCredentials = true;

    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        username: user.email,
        password: user.password
      },
      url: "http://localhost:4000/login"
    })
      .then(res => {
        if (res.data.authenticated) {
          history.push('/map')
        } else {
          setAuth(false);
          console.log(auth);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  function handleClose() {
    setAuth(true);
  }
  const googleLogin = () => {
    window.open("http://localhost:4000/auth/google", "_self")
  }
  useEffect(() => {
    Axios.get('http://localhost:4000/getUser')
      .then(res => {
        console.log(res);
      })
  }, [])
  return (
    <div className="login-pages">
      <div className="d-flex flex-column align-items-center">
        <Grid className="login-form" >
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'style={{paddingTop:"50px"}}>
              <Avatar style={avatarStyle}></Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField label='Email' placeholder='Enter username' fullWidth required onChange={onChangeEmail}
              error={!isValidEmail} value={email} helperText={!isValidEmail && "Type Correct Email address"}
            />
            <TextField label='Password' value = {password} placeholder='Enter password' type='password' fullWidth required onChange={onChangePassword} />
            <Button type='submit' onClick={onSubmit} color='primary' variant="contained" style={btnstyle} fullWidth disabled={!isValidEmail}>Sign in</Button>
            <Typography >
            </Typography>
            <Typography > Don't have an account ?
              <Link to="/register" >
                Sign Up
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
          message="Incorrect username or password"
          action={action}
        >
          <Alert severity="error">Username or password incorrect</Alert>
          </Snackbar>
      </div>
    </div>
  );
}

export default Login;
