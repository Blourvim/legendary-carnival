import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShutterSpeed from '@material-ui/icons/ShutterSpeed';
import {Link} from 'react-router-dom';
import CreatePostDrawer from './CreatePostDrawer';
import { useAuth, useAuthUpdate } from './AuthContext';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar:{
    backgroundColor:"#283747",
  },
  websiteIcon:{
    position:'absolute',
    left:'43%',
    right:'auto',
    color:'white',
top:0

  },
  userButtons:{
    marginRight:"0",
    marginLeft: "auto"

  },
  itemText:{
    textDecoration:'none',
    color:'white',
    marginRight:'0px',
    marginLeft:'auto',
  },
  createPost:{
    position:'absolute',
    left:'0%'
  }
}));

export default function MenuAppBar() {
  const desktop = useMediaQuery('(min-width:600px)');

  const classes = useStyles();
const auth = useAuth()

useAuthUpdate()



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>

      <AppBar className={classes.appBar}position="static">
        <Toolbar>
{auth && <CreatePostDrawer desktop={desktop}/>}



<Link id='link-main-page' to={'/'}>

<IconButton className={classes.websiteIcon} aria-label="button to feed" color="inherit">


<ShutterSpeed /> {desktop&& "Main Page" }

</IconButton>
</Link>



          {auth? (
            <div className={classes.userButtons}>


              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
     
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >


                <Link to={'/profile'}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>

                </Link>

                <MenuItem onClick={handleClose}>My account</MenuItem>

                <Link to={'/signout'}>
                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                </Link>

              </Menu>
            </div>
          )
          :
          <Link
           className={classes.itemText}to={'/signin'}><Typography variant='h6'>Sign In or Sign Up</Typography></Link>
          }
        </Toolbar>
      </AppBar>


    </div>
  );
}
