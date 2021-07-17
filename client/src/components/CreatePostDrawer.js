

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import CreatePost from './CreatePost';
import IconButton from '@material-ui/core/IconButton';
import AddBox from  '@material-ui/icons/AddBox';

const StyledMenu = withStyles({
  paper: {
    margin:'0px',
    padding:'0px',
    border: '1px solid #d3d4d5',
    height:'300px'
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
   
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: 'blue',
        margin:'0px',
        padding:'0px'
     
    },
  },
}))(MenuItem);

export default function CreatePostDrawer() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
Create New Post<AddBox/>
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
    <CreatePost/>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
