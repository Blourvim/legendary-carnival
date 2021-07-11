import React from 'react';
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



const useStyles = makeStyles({
    root: {
    },
      cardAction: {
        display: "flex",
        flex:"1 0 auto",
        flexDirection:"column",
      },
      card:{
      height:"175px",
        marginBottom:"50px",
        maxWidth: 345,
        justifyContent:"start",
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
  
const PostsCard=(props)=> {
    const classes = useStyles();
           const {body, user,id,} =  props

const openPost=()=>{

  console.log(body,user,id)


}

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
      <Card key={`body + ${Math.random()}`} className={classes.card}>
        <CardActionArea className={classes.cardAction} onClick={()=>{openPost()}}>
     
          <CardContent>
           
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button  size="small" color="primary" onClick={()=>{handlePaw(id)}}>
          <FavoriteIcon/>

          </Button>

          <Button size="small" color="primary"onClick={()=>{handleComment(id,)}}>
Comment
          </Button>
        </CardActions>
      </Card>
    );
  }



export default PostsCard