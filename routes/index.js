import express from "express";
import passport from "passport";
import passportLocal from 'passport-local';
import signup from '../controllers/signup.js'
import {isAuth} from '../middleware/auth.js'
const router = express.Router();

router.post('/signup',signup)


router.post('/signin', function(req, res, next) {
    passport.authenticate('local', { successRedirect: '/api/signin-success',
        failureRedirect: '/api/signin-failure' })(req, res, next);

});


 router.get('/signin-failure',(req,res,next)=>{
    res.status(401).send("signin-failure");
})

router.get('/signin-success',(req,res,next)=>{
    res.status(200).send("signin-success");
})



router.get('/signout',isAuth,async(req,res,next)=>{
    req.logout();
    res.send("signout-success");
    
})



export default router;