import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
    },
      cardAction: {
        display: "flex",
        flex:"1 0 auto",
        flexDirection:"column",
      },
      card:{
      height:"175px",
        marginBottom:"50px",
        maxWidth: 345,
        justifyContent:"start",
        display:"flex",
        flexDirection:"column",
      },
      
      body: {
        alignSelf: "end",
        textAlign: "center"
      },
      
      actions: {
        display: "flex",
        justifyContent: "flex-start"
      }
  });
  
const PostsCard=(props)=> {
    const classes = useStyles();
           const info =  props.bodyText


  
    return (
      <Card key={info} className={classes.card}>
        <CardActionArea className={classes.cardAction}>
     
          <CardContent>
           
            <Typography variant="body2" color="textSecondary" component="p">
              {info}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }



export default PostsCard