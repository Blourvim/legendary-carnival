import React,{useEffect, useState} from 'react';
import {Link, useParams} from'react-router-dom';
import {Container, Typography,} from '@material-ui/core';
import axios from 'axios';

const AnotherProfile =()=>{

    const [user, setUser] = useState(false)
    const { userId } = useParams()

const url = "http://localhost:4000"

    useEffect(()=>{
 axios.get(`${url}/user/${userId}`)
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

export default AnotherProfile;