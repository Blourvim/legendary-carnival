import React from 'react';
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Comments from './Comments';
import TextField from '@material-ui/core/TextField';
import PostsCard from './PostsCard';
import {Container } from '@material-ui/core';
import { useAuth } from './AuthContext';



const useStyles = makeStyles({
    root: {
    },
      cardAction: {
        display: "flex",
        flex:"1 0 auto",
        flexDirection:"column",
      },
      card:{
        marginTop:'30px'
      },
      
      body: {
        alignSelf: "end",
        textAlign: "center"
      },
      
      actions: {
        display: "flex",
        justifyContent: "flex-start"
      },
      commentField:{
        backgroundColor:'#b1e1cf',
       borderRadius:'14px',
        paddingTop:'5%',
        marginTop:'20px'
      },
      button:{
        marginTop:'10px',
        marginBottom:'10px',
        padding:'8px',
        right:'-80%',
        left:'auto'
      }
  });
  
const FullPostCard=(props)=> {
    const classes = useStyles();
const { id } = useParams()
const auth = useAuth()
const [post, setPost] = useState(false)
const [commentField, setCommentField] = useState()

useEffect(()=>{

axios.get(`/api/post/${id}`)
.then(res=>{
    setPost(res.data)
})
.catch(err=>{
  console.log(err)
})



},[])


    const handleComment=(postId)=>{
    axios.post(`/api/post/add-comment`,
      {
        postId,
        commentBody:commentField
    },
      {
        withCredentials:true
      }
    
    ).then(function (response) {
      const tempPost = post

      tempPost.comments.unshift({
        body:commentField,
        commenterName: "New Comment(From You)",
        _id:Math.random().toString()
      }


      )
      setPost(false)
      setPost(tempPost)
    })
    .catch(function (error) {
      console.log(error);
    });




    }


  
    return (
      <Container  className={classes.card} maxWidth='sm'>
      {post &&
<div>

<PostsCard post={post} >

  
</PostsCard>


{auth &&
  <Container className={classes.commentField} 
  maxWidth="sm"
  >


  <TextField 
  label="Type Here" 
  variant="filled"
  multiline
  rows='3'
  rowsMax='3'
  size='medium'
  fullWidth
   onChange={(e) => { setCommentField(e.target.value) }}
    />

    <Button 
    variant='contained'
    size="small" 
    color="primary" 
    className={classes.button}
    onClick={() => { handleComment(id, commentField) }}>Comment
    </Button>
    </Container>

}
<Comments comments={post.comments}/>

      </div>


}




</Container>
    );
  }



export default FullPostCard