import axios from 'axios';
import React, { useState,useEffect } from 'react';

import PostsCard from './PostsCard.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const PostsContainer =()=>{
    const [items,setItems] = useState(false);

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
 alignItems="strech"
>
   
   {items && items.map((item,index)=>{

  return(
    <Grid key={index+item.body}item xs={6} spacing={4}>
<PostsCard  bodyText={item.body}/>
</Grid>
  )


 })}</Grid>

</Container>
)

}

export default PostsContainer;