import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles(({ palette }) => ({
    card: {
      borderRadius: 12,
      minWidth: 256,
      maxWidth:400,
      textAlign: 'center',
      marginTop:'19px',
      marginLeft:'auto',
      marginRight:'auto'
    },
    avatar: {
      width: 60,
      height: 60,
      margin: 'auto',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginTop: 8,
      marginBottom: 0,
    },
    subheader: {
      fontSize: 14,
      color: palette.grey[500],
      marginBottom: '0.875em',
    },
    statLabel: {
      fontSize: 12,
      color: palette.grey[500],
      fontWeight: 500,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      margin: 0,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
      letterSpacing: '1px',
    },
  }));

const Profile = (props)=> {
    const classes = useStyles();
    const {userInfo} = props.userInfo

    console.log(userInfo)
    return (
      <Card className={classes.card}>
        <CardContent>
          <Avatar className={classes.avatar} src={'https://i.pravatar.cc/300'} />
          <h3 className={classes.heading}>{userInfo?userInfo.name:"loading..."}</h3>
        </CardContent>
        <Divider light />
        <Box display={'flex'}>
          <Box p={2} flex={'auto'} className={classes.statBox}>
            <p className={classes.statLabel}>Followers</p>
            <p className={classes.statValue}>{userInfo?userInfo.name:"loading..."}</p>
          </Box>
          <Box p={2} flex={'auto'} className={classes.statBox}>
            <p className={classes.statLabel}>Following</p>
            <p className={classes.statValue}>12</p>
          </Box>
        </Box>
      </Card>
    );
  };
  
  export default Profile
