import axios from 'axios';
import {useEffect} from 'react';


const SignOut =()=>{

    const url ="http://localhost:4000"
useEffect(()=>{
    axios.get(url+"/signout",
    {withCredentials:true})
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
  



},[])

return("signing out")
}




export default SignOut