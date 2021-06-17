import express from "express";
import passport from "passport";
const router = express.Router();


router.post('/login', 
passport.authenticate('local',
 { failureRedirect: '/login-failure', successRedirect: 'login-success' }));
 

export default router;