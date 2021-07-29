import axios from 'axios';
import {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth, useAuthUpdate } from './AuthContext';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
text:{

},
container:{
    background:'linear-gradient(90deg, rgba(220,215,240,1) 0%, rgba(201,229,245,1) 66%)',
    borderRadius:'10px',

    marginTop:'20px',
    padding:'20px'
}

    
}))


const SignOut =()=>{
    const classes = useStyles();
    const updateAuth =useAuthUpdate()
    const test = useAuth()


useEffect(()=>{
    axios.get("/signout",
    {withCredentials:true})
    .then(res=> res.status===200 && updateAuth() )
    .catch(err=>console.error(err))
  



},[])

return(<Container maxWidth="sm"

className={classes.container}>

{


test || <Redirect to='/'/>



}
<Typography
className={classes.text}
color='textPrimary'
align='center'
variant='h3'


>
You will be redirected back to the main page
</Typography>
</Container>
)
}




export default SignOut