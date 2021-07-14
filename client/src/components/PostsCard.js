import React from 'react';
import {Link} from 'react-router-dom'
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
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';



const useStyles = makeStyles({
    root: {
    },
      cardAction: {
        display: "flex",
        flex:"1 0 auto",
        flexDirection:"column",
      },
      card:{
        height:'100%',
        marginBottom:"50px",
        maxWidth: 345,
        justifyContent:"start",
        display:"flex",
        flexDirection:"column",
        backgroundColor:'#BDE2EC'
      },
      
      body: {
        alignSelf: "end",
        textAlign: "center"
      },
      
      actions: {
        display: "flex",
        justifyContent: "flex-start"
      },
      avatar:{
        position:'relative',
        width:'54px',
        boxSizing:'content-box',
        borderWidth:'50px 18px 0',
        borderStyle:'solid',
        '&::before':{
          content: "some",
          position:'absolute',
          height:'0',
          width:'0',
          top:'-85px',
          bottom:'-18px',
          borderWidth:'0 45px 35px',
          borderStyle:'solid'
        }
      }
  });
  
const PostsCard=(props)=> {
    const classes = useStyles();
           const {body, user,_id,createdAt,favoritesCount} =  props.post
           console.log(props)

const openPost=()=>{



}

    const handlePaw=(postId)=>{
      const url = "http://localhost:4000"
        console.log(_id + "liked")
      axios.post(`${url}/post/like-post`,
        {postId:postId},
        {withCredentials:true}
      
      ).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });



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
                <Link className={classes.cardAction} to={`/user/${user}`}>

<CardHeader
        avatar={
          <Avatar aria-label="User" >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={_id}
        subheader={createdAt}
      />
      </Link>
                <Link className={classes.cardAction} to={`/posts/${_id}`}>

        <CardActionArea  >
     
          <CardContent>
           
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
          </CardContent>

        </CardActionArea>
        </Link>

        <CardActions className={classes.actions}>
          <Button  size="small" color="primary" onClick={()=>{handlePaw(_id)}}>
          <FavoriteIcon style={{color:"red"}}/>

          </Button>
<Link to={`/posts/${_id}`}>
          <Button size="small" color="primary"onClick={()=>{handleComment(_id)}}>
Comment
          </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }



export default PostsCard