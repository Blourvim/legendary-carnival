import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Container, Grid, Typography, Switch, Button} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAuth, useAuthUpdate } from './AuthContext';

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
  

  const url = "http://localhost:4000"

  const handleChange = (event) => {
    const test = state
    setState(!test);
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

      <TextField id="filled-basic" name ="email" label="E-Mail" variant="filled" />



      {!state
&& <TextField
id="standard-password-input"
name='username'
label="User Name"
variant="filled" 
autoComplete="current-password"
/>}
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          variant="filled" 
          autoComplete="current-password"
        />
        
{!state
&& <TextField
id="standard-password-input"
label="Confirm Password"
type="password"
variant="filled" 
autoComplete="current-password"
/>
} 
<Button type="submit" variant="contained"align="center" color="secondary">Sign In</Button>

    </form>
    </div>

    </Grid>

  );
};

export default Signin;