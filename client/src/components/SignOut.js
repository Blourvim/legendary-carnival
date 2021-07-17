import axios from 'axios';
import {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

    const url ="http://localhost:4000"
useEffect(()=>{
    axios.get(url+"/signout",
    {withCredentials:true})
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
  



},[])

return(<Container maxWidth="sm"

className={classes.container}>
<Typography
className={classes.text}
color='textPrimary'
align='center'
variant='h3'


>
    You Have Been Signed Out

</Typography>
</Container>
)
}




export default SignOut