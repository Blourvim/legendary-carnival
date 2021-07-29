import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import axios from 'axios';
import { Grid, Typography, Switch, Button, FormControl, InputAdornment, IconButton} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {useAuthUpdate } from './AuthContext';
import isEmail from 'validator/lib/isEmail';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import isLength from 'validator/lib/isLength';


const useStyles = makeStyles((theme) => ({
    container:{
      marginTop:'25px',
        padding:"40px",
        background:'linear-gradient(90deg, rgba(220,215,240,1) 0%, rgba(201,229,245,1) 66%)',
        borderRadius:'6px'
    }
    ,
    switch:{
        left:"0px",
        with:'100%'

    }
,
switchText:{
marginLeft:'17px'
},
  root: {
      display:'grid',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Signin=()=> {
  const classes = useStyles();
  const [state, setState] = useState(true);
  const [success, setSuccess] =useState(false);
  const [error, setError] = useState(false);
  const [signInError, setSignInError] = useState(false);



  const updateAuth = useAuthUpdate();

  const [emailValue , setEmailValue] =useState("");
  const [isEmailState, setIsEmailState] =useState(false);
  const [isEmailStateErr, setIsEmailStateErr] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isPasswordStateErr, setIsPasswordStateErr] = useState(false);
  const [showPassword, setShowPassword] =useState(false);


  const url = "http://localhost:4000";


  const useHandleEmailValidation=(e)=>{

    setEmailValue(e.target.value)
    console.log(isEmail(emailValue))
    if(emailValue.length > 4){
      setIsEmailStateErr(true)
    }


    if(
      isEmail(emailValue)
    ){
      setIsEmailState(true)
      return
    }
    setIsEmailState(false)
}
  const usePasswordValidation=(e)=>{

    setPasswordValue(e.target.value);
    console.log();
    if(passwordValue.length > 3 ){
      setIsPasswordStateErr(true);

    }

    if (isLength(passwordValue,{min:8, max: 32}))
    {
      setPasswordIsValid(true) ;
      return
    }
    
    setPasswordIsValid(false)

  }

  const handleClickShowPassword=()=>{
    setShowPassword(!showPassword)
  }


  const handleChange = () => {
    setState(!state);
  };

  const handleFormSubmit =(e)=>{
    e.preventDefault()

    if(state)  //if Sign In
    {
      axios.post(`${url}/signin`, {
        username: e.target.email.value,
        password: e.target.password.value
      },
     {
      withCredentials: true
     } 
      )
      .then((res)=> {
        if(res.status===200){
          console.log(res)
          setSuccess(true)
    updateAuth()

        };
        console.log("fail"+res )

      })
      .catch(function (error) {
        console.log(error);
        setSignInError(error.response.data.message)

      });
    }
    else //if Sign Up
    {  
    
      axios.post(`${url}/signup`, {
        email: e.target.email.value,
        password: e.target.password.value,
        username:e.target.username.value,
      },
     {
      withCredentials: true
     } 
      )
      .then(function (response) {
        console.log(response?.json?.message);
        setState(true)

      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
        setError(error?.response?.data?.message)
      });


    }



  }


  return (
      <Grid  container justify = "center">
        {
success && <Redirect to='/'/>

        }
          <div className={classes.container}>
           <Typography align="center" variant="h3">
            {
            state
            ?"Sign In"
            :"Sign Up" 
            }
            </Typography>

        
            <Typography className={classes.switchText}color='textPrimary' align="right" variant="p3">{
            state 
            ? "Don't have an account ?"
            : "Do you need to sign in ?"
            }</Typography>
              <Switch
              className={classes.switch}
        checked={state}
        onChange={handleChange}
        color="primary"
        name="switch"
        inputProps={{ 'aria-label': 'sign in sign up checkbox' }}
      />

                 <form onSubmit={handleFormSubmit}className={classes.root} noValidate autoComplete="off">

      <TextField 
      onChange={useHandleEmailValidation}
      
      id="filled-basic"
      name ="email"
      label="E-Mail"
      required
      variant="filled"
      error={!state && !isEmailState &&isEmailStateErr}
      helperText={!state &&isEmailStateErr && !isEmailState && 'Email is not valid'}
      
      />

      {!state
&& <TextField
id="username-input"
name='username'
label="User Name"
variant="filled" 
/>}
<FormControl  

helperText={'password is too short'}

variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
          name='password'
          required
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={usePasswordValidation}
            error={!state && !passwordIsValid && isPasswordStateErr}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

<Button type="submit" variant="contained"align="center" color="secondary">{state?'Sign In':'Sign Up'}</Button>

{
//sign in error

state && signInError }

{
//sign up error

!state && error }

    </form>
    </div>
    </Grid>

  );
};

export default Signin;