import express from "express";
import passport from "passport";
import signup from '../controllers/signup.js'
import {isAuth} from '../middleware/auth.js'
const router = express.Router();


router.post('/signin',
passport.authenticate('local',
 { failureRedirect: '/signin-failure',
  successRedirect: '/signin-success' }),(err,req,res,next)=>{console.log(err); next()});
 

 router.post('/signup',signup)


 router.get('/p',isAuth,(req,res,next)=>{
    res.send(req.user);
})



router.get('/signout',isAuth,(req,res,next)=>{
    req.logout();
    res.redirect('/protected-route');
})


router.get('/signin', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/signin">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

router.get('/signup',async(req,res)=>{


    const form = '<h1>Login Page</h1><form method="POST" action="/signup">\
    Enter Username:<br><input type="text" name="name">\
    Enter Username:<br><input type="text" name="email">\
    Enter Username:<br><input type="text" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

})


export default router;