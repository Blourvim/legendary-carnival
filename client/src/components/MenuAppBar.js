import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShutterSpeed from '@material-ui/icons/ShutterSpeed';
import {Link} from 'react-router-dom';
import CreatePostDrawer from './CreatePostDrawer'


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
    left:'50%'


  },
  userButtons:{
    marginRight:"0",
    marginLeft: "auto"

  },
  itemText:{
    textDecoration:'none',
    color:'white'
  },
  createPost:{
    position:'absolute',
    left:'0%'
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  const handleMenuPost = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar className={classes.appBar}position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
<CreatePostDrawer/>
          <IconButton edge='center'className={classes.websiteIcon} aria-label="show 4 new mails" color="inherit">


          <ShutterSpeed />
          </IconButton>
          {auth? (
            <div className={classes.userButtons}>

<IconButton aria-label="show 4 new mails" color="inherit">
<Badge badgeContent={4} color="secondary">
  <MailIcon />
</Badge>
</IconButton>

<IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

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
          <Link className={classes.itemText}to={'/signin'}>Login</Link>
          }
        </Toolbar>
      </AppBar>


    </div>
  );
}
