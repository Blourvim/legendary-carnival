import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PostsCard from './PostsCard.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
commentField:{
  position:'sticky',
  bottom:"0px",
  height:"80px"
},
gridItem:{
},
container:{
  marginTop:'20px'
}
})


const PostsContainer =()=>{
    const [items,setItems] = useState(false);
    const classes = useStyles();

 useEffect(()=>{
    axios.get( `/post/get-feed`)
    .then(response=>{
      console.log(response)
      setItems(response.data)
    })


  },[])


return(
  <Container
 maxWidth="xs"
 className={classes.container}
   >
 <Grid  container
 direction="row"
 justify="center"
 spacing={1}

>
   
   {items && items.map((item,index)=>{

  return(
    <Grid className={classes.gridItem} item xs={12} key={index + item.body}>
<PostsCard post={item} />
</Grid>
  )


 })}</Grid>
    
</Container>
)

}

export default PostsContainer;