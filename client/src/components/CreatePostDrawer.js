

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

export default function CreatePostDrawer(props) {
  const {desktop} = props
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
      id='create-new-post'
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
 {desktop && 'New Post'}
 <AddBox/>
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
