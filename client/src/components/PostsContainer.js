import axios from 'axios';
import React, { useState,useEffect } from 'react';

import PostsCard from './PostsCard.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const PostsContainer =()=>{
    const [items,setItems] = useState(false);

  
 useEffect(()=>{

    axios.get("https://api.jikan.moe/v3/top/anime/1/upcoming")
    .then(response=>setItems(response.data.top))


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
   
   {items && items.map((item)=>{

  return(
    <Grid item xs={6} spacing={4}>
<PostsCard  bodyText={item.title}/>
</Grid>
  )


 })}</Grid>

</Container>
)

}

export default PostsContainer;