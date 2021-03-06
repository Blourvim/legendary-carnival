import React from "react";
import { Link } from 'react-router-dom';
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import GrainIcon from '@material-ui/icons/Grain';
import PersonIcon from '@material-ui/icons/Person';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
  body:{
    margin:0
  },
  appbar: {
    background: "#283747",
    margin: 0,
    height: "4rem",

  },

  toolbar:{
    verticalAlign:'top',
    paddingRight:'0px',
    alignSelf:'center',

  },
  navbarButtons:{ 
    alignSelf:'center',
    display:'inline-flex',
    marginLeft:'0px',
    marginRight:'0px',
    color:'white'
  
},
itemText:{
  textDecoration:'none',
  color:'white'
}
}));


const Navbar = () => {
  const bigScreen = useMediaQuery('(min-width:600px)')

  const classes = useStyles();

  
  return (
    <div id='Home'>
      <Box component="nav">
        <AppBar position="static" className={classes.appbar}>
          <Toolbar className={classes.toolbar} >
        {bigScreen &&
        <List className={classes.navbarButtons} >
        {['Home',"Profile",'Sign In','Create Post','Sign Out',].map((text, index) => (


          <Link key={text +'navbarlink'} to={["/","/profile","/signin","/create-post","/signout"][index]} >

          <ListItem button key={text +'navbar'}>
            <ListItemIcon color={'primary'}key={text +'navbaricon'}>{[<HomeIcon/>,<PersonIcon/>,<GrainIcon/>,<PersonIcon/>,<ContactMailIcon/>][index]}</ListItemIcon>

            <ListItemText className={classes.itemText}key={text +'navbartext'} primary={text} />
            
          </ListItem>
          </Link>
        ))}
      </List>
        
        }  
          </Toolbar>
        </AppBar>
      </Box>
      

    </div>
  );
};

export default Navbar;