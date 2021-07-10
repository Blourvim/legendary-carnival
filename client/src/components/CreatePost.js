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
      <Grid  container justify = "center">
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