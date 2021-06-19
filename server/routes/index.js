import express from "express";
import passport from "passport";
import signup from '../controllers/signup.js'
import {isAuth} from '../middleware/auth.js'
const router = express.Router();


router.post('/signin', (req,res,next)=>{console.log(res);next()},
passport.authenticate('local',
 { failureRedirect: '/signin-failure',
  successRedirect: '/signin-success' }),(err,req,res,next)=>{console.log(err); next()});
 

 router.post('/signup',signup)


 router.get('/p',isAuth,(req,res,next)=>{
    res.send('protected-route-secret');
})



router.get('/signout',isAuth,(req,res,next)=>{
    req.logout();
    res.redirect('/protected-route');
})



// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/signin">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});


router.post('/',async(req,res)=>{console.log(typeof(req.body))});


export default router;