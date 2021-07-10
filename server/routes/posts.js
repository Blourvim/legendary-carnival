import express from "express";
import passport from "passport";
import {isAuth} from '../middleware/auth.js';
import {create,favorite,comment, getFeed} from '../controllers/postControllers.js';
import Tweet from '../models/Schemas/TweetSchema.js';
const router = express.Router();

router.post('/create',isAuth,create);

router.post('/xx',isAuth,favorite)

router.post('/comment',isAuth,comment)


router.get('/comment',async(req,res)=>{

    const form = '<h1>Login Page</h1><form method="POST" action="/post/comment">\
    Enter Username:<br><input type="text" name="comment"> \
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

})


router.get('/x',isAuth,async(req,res)=>{

    const form = '<h1>Login Page</h1><form method="POST" action="/post/xx">\
    Enter Username:<br><input type="text" name="id">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);


})

router.get('/get-feed',getFeed)
export default router;