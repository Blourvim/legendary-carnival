import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Grid, Typography, Switch, Button} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {useAuthUpdate } from './AuthContext';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import isStrongPassword from 'validator/lib/isStrongPassword';
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
  const [success, setSuccess] =useState(false)
  const updateAuth = useAuthUpdate()

  const [emailValue , setEmailValue] =useState("")
  const [isEmailState, setIsEmailState] =useState(false)
  const [isEmailStateErr, setIsEmailStateErr] = useState(false)

  const [passwordValue, setPasswordValue] = useState("")
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [isPasswordStateErr, setIsPasswordStateErr] = useState(false)


  const url = "http://localhost:4000"


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

    setPasswordValue(e.target.value)

    if(passwordValue>3){
      setIsPasswordStateErr(true)

    }

    if (isLength(passwordValue,{min:8, max: 32}))
    {
      setPasswordIsValid(true) 
      return
    }
    
    setPasswordIsValid(false)

  }


  const handleChange = (event) => {
    const tempState = state
    setState(!tempState);
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
        console.log(response);
        setState(true)

      })
      .catch(function (error) {
        console.log(error);
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
      variant="filled"
      error={!state && !isEmailState &&isEmailStateErr}
      helperText={!state &&isEmailStateErr && !isEmailState && 'Email is not valid'}
      
      />

      {!state
&& <TextField
id="standard-password-input"
name='username'
label="User Name"
variant="filled" 
/>}
      <TextField
      onChange={usePasswordValidation}
          id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          variant="filled" 
          autoComplete="current-password"
          error ={!state && !passwordIsValid && isPasswordStateErr}
          helperText={!state && !passwordIsValid && isPasswordStateErr && 'Password is too short'}
        />

<Button type="submit" variant="contained"align="center" color="secondary">Sign In</Button>

    </form>
    </div>

    </Grid>

  );
};

export default Signin;