import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Container, Grid, Typography, Switch, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container:{
      height:'100px',
      margin:'0px',
        padding:"40px",
        background:'linear-gradient(90deg, rgba(220,215,240,1) 0%, rgba(201,229,245,1) 66%)'

    }
    ,
    switch:{
        left:"0px",
        margin:'0px',


    }
,
  root: {
      display:'grid',
    '& > *': {
      margin:'0px',
    },
  },
  grid:{
    margin:'0px',
  }
}));

const CreatePost=()=> {
  const classes = useStyles();

  const url = "http://localhost:4000"

  const handleFormSubmit =(e)=>{
    e.preventDefault()
      axios.post(`${url}/post/create`, {
        body: e.target.body.value
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

  return (
      <Grid  className={classes.grid} container justify = "center">
          <div className={classes.container}>
       

        
        

                 <form onSubmit={handleFormSubmit}className={classes.root} noValidate autoComplete="off">

      <TextField id="filled-basic" name ="body" label="body" variant="filled" />




<Button type="submit" variant="contained"align="center" color="secondary">Create Post</Button>

    </form>
    </div>

    </Grid>

  );
};

export default CreatePost;