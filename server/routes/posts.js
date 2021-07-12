import express from "express";
import passport from "passport";
import {isAuth} from '../middleware/auth.js';
import {create,favorite,comment, getFeed, getPost} from '../controllers/postControllers.js';
import Tweet from '../models/Schemas/TweetSchema.js';
const router = express.Router();

router.post('/create',isAuth,create);

router.post('/like-post',isAuth,favorite)


router.post('/add-comment',isAuth,comment)

router.get('/get-feed',getFeed)

router.get('/:id', getPost)

export default router;