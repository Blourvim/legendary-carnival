import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import PostsCard from './PostsCard.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles({
commentField:{
  position:'sticky',
  bottom:"0px",
  height:"80px"
}
})


const PostsContainer =()=>{
    const [items,setItems] = useState(false);
    const classes = useStyles();

  const url = "http://localhost:4000" 
 useEffect(()=>{
    axios.get( `${url}/post/get-feed`)
    .then(response=>{
      console.log(response)
      setItems(response.data)
    })


  },[])


return(
  <Container
 maxWidth="md"
  
   >
 <Grid  container
 direction="row"
 justify="center"
 spacing={4}
>
   
   {items && items.map((item,index)=>{

  return(
    <Grid item xs={6} key={index + item.body}>
<PostsCard  id={item._id }body={item.body}/>
</Grid>
  )


 })}</Grid>
    
</Container>
)

}

export default PostsContainer;