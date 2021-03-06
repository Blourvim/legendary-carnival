import React,{useEffect, useState} from 'react';
import {Redirect} from'react-router-dom';
import axios from 'axios';



const UserProfile = React.memo(function ProfileCard() {
    const [user, setUser] = useState(false)
    
        useEffect(()=>{
     axios.get("/api/user",{withCredentials:true})
     .then(res=>{
         
        setUser(res.data.userInfo);
    
    })
     .catch(err=> console.log(err))
    
        },
        
        
        
        [])
    return (
      <div>
      {user&& <Redirect to={`/user/${user._id}`}/>
    } </div>   );
  });
  
  export default UserProfile
