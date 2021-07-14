import React,{useEffect, useState} from 'react';
import {Link} from'react-router-dom';
import {Container, Typography,} from '@material-ui/core';
import axios from 'axios';

const UserProfile =()=>{

    const [user, setUser] = useState(false)
const url = "http://localhost:4000"

    useEffect(()=>{
 axios.get(url+"/user",{withCredentials:true})
 .then(res=>{
     
    console.log(res);
    setUser(res.data);

})
 .catch(err=> console.log(err))

    },
    
    
    
    [])

return(

<div>
    hi
</div>


)

}

export default UserProfile;