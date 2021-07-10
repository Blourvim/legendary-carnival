import express from "express";
import passport from "passport";
import signup from '../controllers/signup.js'
import {isAuth} from '../middleware/auth.js'
const router = express.Router();

router.post('/signup',signup)


router.post('/signin', function(req, res, next) {
    passport.authenticate('local', { successRedirect: '/signin-success',
        failureRedirect: '/signin-failure' })(req, res, next);

});


 router.get('/signin-failure',(req,res,next)=>{
    res.send("signin-failure");
})
router.post('/test',(req,res,next)=>{
    res.send("req.user");
})
router.get('/signin-success',(req,res,next)=>{
    res.send("signin-success");
})



router.get('/signout',isAuth,async(req,res,next)=>{
    req.logout();
    res.redirect('/protected-route');
})



router.get('/data',async(req,res)=>{


    const form = '<h1>Login Page</h1><form method="POST" action="/signup">\
    Enter Username:<br><input type="text" name="name">\
    Enter Username:<br><input type="text" name="email">\
    Enter Username:<br><input type="text" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    console.log(req.user)
    res.status(200).json(req.user);

})


export default router;