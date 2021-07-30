import React,{useEffect, useState,} from 'react';
import { useParams} from'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import Grid from '@material-ui/core/Grid'
import PostsCard from './PostsCard'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';


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

const AnotherProfile =()=>{

    const [userInfo, setUserInfo] = useState(false)
    const { user} = useParams()
    const classes = useStyles();



    useEffect(()=>{
 axios.get(`/api/user/${user}`,{withCredentials:true})
 .then(res=>{
     
    setUserInfo(res.data);
})
 .catch(err=> console.log(err))

    },
    
    
    
    [])

return(

<Container className={classes.container}maxWidth='sm'>
    <Profile userInfo={userInfo}/>

    <Grid container
    direction="row"
 justify="center"
 spacing={1}
    >

    {userInfo &&
    userInfo.userInfo.posts.map((post,index)=>{
   
                    return(
                        <Grid item xs={12} key={`profilePost ${index}`}>
                            <PostsCard post={post}/>
                        </Grid>
            
                    )
    



    }) 
 }




    </Grid>


</Container>


)

}

export default AnotherProfile;