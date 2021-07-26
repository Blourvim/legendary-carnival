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
import ChatBubble from '@material-ui/icons/ChatBubble';
import Moment from 'react-moment';


const useStyles = makeStyles({
    root: {
    },
      cardAction: {
        display: "flex",
        flex:"1 0 auto",
        flexDirection:"column",
        textDecoration:'none',
        color:'black',
        fontWeight:'bold',
        marginTop:'5px',
        paddingTop:'0px'
      },
      card:{
        height:'183px',
        marginBottom:"20px",
        justifyContent:"start",
        display:"flex",
        flexDirection:"column",
        borderRadius:"10px",
      },
      
      body: {
        alignSelf: "end",
        textAlign: "center",
      },
      
      actions: {
        display: "flex",
        justifyContent: "flex-start",
        background:'linear-gradient(90deg, rgba(220,215,240,1) 0%, rgba(201,229,245,1) 66%)'

      },
      cardContent:{
        marginTop:"0px",
        paddingTop:'0px',
        paddingBottom:'0px',
        marginBotton:"0px"
      },
      cardHeader:{
        paddingBottom:'5px'
      }
     
  });
  
const PostsCard=(props)=> {
    const classes = useStyles();
           const {body, user,_id,createdAt,comments,favoritesCount} =  props.post
           console.log(props)


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

    return (
      <Card key={`body + ${Math.random()}`} className={classes.card}>
                <Link className={classes.cardAction} to={`/user/${user}`}>

<CardHeader
className={classes.cardHeader}
        avatar={
          <Avatar src="https://picsum.photos/200" aria-label="User" >
            
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
    
        title={    <Typography>{props.post.user.name}</Typography>}
        subheader={<Moment date={createdAt} format={"YYYY/MM/DD HH:MM"}/>}
        
      />
        
      </Link>
                <Link className={classes.cardAction} to={`/posts/${_id}`}>
<CardContent className={classes.cardContent}>
        <CardActionArea  >
     
           
            <Typography variant="body2" color="textPrimary" component="p">
              {body}
            </Typography>

        </CardActionArea>
        </CardContent>
        </Link>

        <CardActions className={classes.actions}>
          <Button  size="small" color="primary" onClick={()=>{handlePaw(_id)}}>
          <FavoriteIcon style={{color:"red"}}/>{favoritesCount}

          </Button>
<Link to={`/posts/${_id}`}>
          <Button size="small" color="primary">
<ChatBubble style={{color:'#8f80ee'}}/> {comments.length}
          </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }



export default PostsCard