import express from "express";
import passport from "passport";
import {isAuth} from '../middleware/auth.js';
import {createPost,favorite} from '../controllers/postControllers.js';
import Tweet from '../models/Schemas/TweetSchema.js';
const router = express.Router();

router.post('/create',isAuth,createPost);

router.post('/xx',isAuth,favorite)

router.get('/x',isAuth,async(req,res)=>{

    const form = '<h1>Login Page</h1><form method="POST" action="/post/xx">\
    Enter Username:<br><input type="text" name="id">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);


})

router.get('/feed',async(req,res)=>{

    const feed = await Tweet.find({})


    res.json(feed)


})
router.get('/create',isAuth,(req,res)=>{



    const form = '<h1>Login Page</h1><form method="POST" action="/post/create">\
    Enter Username:<br><input type="text" name="text">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

export default router;