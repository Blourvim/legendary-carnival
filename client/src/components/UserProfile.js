import React,{useEffect, useState} from 'react';
import {Link,Redirect} from'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles(({ palette }) => ({
    card: {
      borderRadius: 12,
      minWidth: 256,
      maxWidth:400,
      textAlign: 'center',
      marginTop:'19px',
      marginLeft:'auto',
      marginRight:'auto'
    },
    avatar: {
      width: 60,
      height: 60,
      margin: 'auto',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginTop: 8,
      marginBottom: 0,
    },
    subheader: {
      fontSize: 14,
      color: palette.grey[500],
      marginBottom: '0.875em',
    },
    statLabel: {
      fontSize: 12,
      color: palette.grey[500],
      fontWeight: 500,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      margin: 0,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
      letterSpacing: '1px',
    },
  }));

const UserProfile = React.memo(function ProfileCard() {
    const classes = useStyles();
    const [user, setUser] = useState(false)
    const url = "http://localhost:4000"
    
        useEffect(()=>{
     axios.get(url+"/user",{withCredentials:true})
     .then(res=>{
         
        console.log(res);
        setUser(res.data.userInfo);
    
    })
     .catch(err=> console.log(err))
    
        },
        
        
        
        [])
    return (
      <div>
      {user && <Redirect to={`/user/${user._id}`}/>
    } </div>   );
  });
  
  export default UserProfile
