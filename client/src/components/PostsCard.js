import React,{useState} from 'react';
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
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubble from '@material-ui/icons/ChatBubble';
import {useAuth} from './AuthContext'
import { Redirect } from 'react-router';
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
        justifyContent:"start",
        display:"flex",
        flexDirection:"column",
        borderRadius:"10px",
        marginTop:'20px'
      },
      
      body: {
        wordWrap:'break-word'

      },
      
      actions: {
        display: "flex",
        justifyContent: "flex-start",
        background:'linear-gradient(90deg, rgba(220,215,240,1) 0%, rgba(201,229,245,1) 66%)'

      },
      cardContent:{
        heigh:'300px',
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

           const [favoritesCountState, setFavoritesCount] = useState(favoritesCount);

           const [clicked, setClicked] = useState(false)
        const isAuth = useAuth()



    const handlePaw=(postId)=>{

      if(isAuth){
      axios.post(`/api/post/like-post`,
      {postId:postId},
      {withCredentials:true}
      
      ).then(function (response) {
        console.log(response)
        if(response.data==="favorited"){
          setFavoritesCount(favoritesCountState + 1)
          return
        }
        setFavoritesCount(favoritesCountState -1)
        
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
      
    }else{
      
      setClicked(true)


    }
      
    }
    
    return (
      <Card key={`body + ${Math.random()}`} className={classes.card}>
                <Link className={classes.cardAction} to={`/user/${user._id}`}>

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
        subheader={createdAt}
        
      />
        
      </Link>
                <Link className={classes.cardAction} to={`/posts/${_id}`}>
<CardContent className={classes.cardContent}>
        <CardActionArea  >
     
           
            <Typography className={classes.body}variant="body2" color="textPrimary" component="p">
              {body}
            </Typography>

        </CardActionArea>
        </CardContent>
        </Link>

        <CardActions className={classes.actions}>
          {!isAuth && clicked && <Redirect to='/signin'/>}
          <Button  size="small" color="primary" onClick={()=>{handlePaw(_id)}}>
          <FavoriteIcon style={{color:"red"}}/>{favoritesCountState}

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