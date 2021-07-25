import React,{useEffect, useState} from 'react';
import {Link, useParams} from'react-router-dom';
import {Container, Typography,} from '@material-ui/core';
import axios from 'axios';
import Profile from './Profile';

const AnotherProfile =()=>{

    const [userInfo, setUserInfo] = useState(false)
    const { user} = useParams()

const url = "http://localhost:4000"

    useEffect(()=>{
        console.log(user)
 axios.get(`${url}/user/${user}`,{withCredentials:true})
 .then(res=>{
     
    console.log(res);
    setUserInfo(res.data);

})
 .catch(err=> console.log(err))

    },
    
    
    
    [])

return(

<div>
    <Profile userInfo={userInfo}/>
</div>


)

}

export default AnotherProfile;