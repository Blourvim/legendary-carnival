import express from "express";
import passport from "passport";
import signup from '../controllers/signup.js'
const router = express.Router();


router.post('/signin', (req,res,next)=>{console.log(req.body);next()},
passport.authenticate('local',
 { failureRedirect: '/signin-failure',
  successRedirect: '/signin-success' }),(err,req,res,next)=>{console.log(err); next()});
 

 router.post('/signup',signup)



 router.post('/',async(req,res)=>{console.log(typeof(req.body))})
export default router;