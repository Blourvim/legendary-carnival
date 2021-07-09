import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Container, Grid, Typography, Switch, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container:{
        padding:"40px",
        backgroundColor:"hsl(220, 95%, 80%)",
        borderRadius:'6px'
    }
    ,
    switch:{
        left:"0px"

    }
,
  root: {
      display:'grid',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Login=()=> {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const url = "http://localhost:4000"

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleFormSubmit =(e)=>{
    e.preventDefault()
    if(state.checkedB)  //if sign in
    {
      axios.post(`${url}/signin`, {
        username: e.target.email.value,
        password: e.target.password.value
      },
     {
      withCredentials: true,
     } 
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  }
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/p",
    }).then((res) => {
      console.log(res.data);
      console.log("res.data");

    });
  return (
      <Grid  container justify = "center">
          <div className={classes.container}>
           <Typography align="center" variant="h3">
            {
            state.checkedB 
            ?"Sign In"
            :"Sign Up" 
            }
            </Typography>

        
            <Typography align="center" variant="p3">{
            state.checkedB 
            ? "Don't have an account ?"
            : "Do you need to sign in ?"
            }</Typography>
              <Switch
              className={classes.switch}
        checked={state.checkedB}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'sign in sign up checkbox' }}
      />

                 <form onSubmit={handleFormSubmit}className={classes.root} noValidate autoComplete="off">

      <TextField id="filled-basic" name ="email" label="E-Mail" variant="filled" />



      {!state.checkedB 
&& <TextField
id="standard-password-input"
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
        
{!state.checkedB 
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

export default Login;