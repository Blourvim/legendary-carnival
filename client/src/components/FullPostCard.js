import React from 'react';
import {useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Comments from './Comments';



const useStyles = makeStyles({
    root: {
    },
      cardAction: {
        display: "flex",
        flex:"1 0 auto",
        flexDirection:"column",
      },
      card:{
        margin:"0 auto",
      height:"175px",
        marginBottom:"50px",
        maxWidth: 345,
        justifyContent:"cener",
        display:"flex",
        flexDirection:"column",
      },
      
      body: {
        alignSelf: "end",
        textAlign: "center"
      },
      
      actions: {
        display: "flex",
        justifyContent: "flex-start"
      }
  });
  
const FullPostCard=(props)=> {
    const classes = useStyles();
const { id } = useParams()
const [post, setPost] = useState(false)
useEffect(()=>{
    const url = "http://localhost:4000" 

axios.get(`${url}/post/${id}`)
.then(res=>{
    console.log(res)
    setPost(res.data)
})



},[])


    const handlePaw=(postId)=>{
      const url = "http://localhost:4000"
        console.log(id + "liked")
      axios.post(`${url}/post/like-post`,
        {postId:postId},
        {withCredentials:true}
      
      )



    }
    const handleComment=(postId,commentBody)=>{
      const url = "http://localhost:4000"
      console.log(`${postId} commented with ${commentBody}`)
    axios.post(`${url}/post/add-comment`,
      {
        postId,
        commentBody:"test test body 123"
    },
      {
        withCredentials:true
      }
    
    )




    }


  
    return (
      <div>
      {post &&
<div>

      <Card key={`fullpostcard`} className={classes.card}>
                <Link className={classes.cardAction} to={`/posts/${id}`}>

        <CardActionArea  >
     
          <CardContent>
           
            <Typography variant="body2" color="textSecondary" component="p">
              {post.body}
            </Typography>
          </CardContent>

        </CardActionArea>
        </Link>

        <CardActions className={classes.actions}>
          <Button  size="small" color="primary" onClick={()=>{handlePaw(id)}}>
          <FavoriteIcon/>

          </Button>

          <Button size="small" color="primary"onClick={()=>{handleComment(id,)}}>
Comment
          </Button>
        </CardActions>
      </Card>

<Comments comments={post.comments}/>
      </div>


}




</div>
    );
  }



export default FullPostCard