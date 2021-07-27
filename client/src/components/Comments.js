import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "hsl(194, 53.3%, 79%)",
    margin:"0 auto",
    borderRadius:'10px',
    marginTop:'20px'


  },
}));

const Comments=(props)=> {
  const classes = useStyles();

  return (
    <>
   {props.comments.length !== 0 &&  <List className={classes.root}>
      {props.comments.map((comment,index)=>{
return(
  <div>
 <ListItem key={comment.id} >
  <ListItemAvatar>
    <Avatar>
      <ImageIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary={comment.commenterName} secondary={comment.body}/>
</ListItem>
{props.comments.length !== 0 && props.comments.length-1 !== index && <Divider variant="inset" component="li" />}
</div>
)

      })}
  
    </List>
  }
  </>
  );
}


export default Comments