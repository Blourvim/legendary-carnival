import express from "express";
import passport from "passport";
import {isAuth} from '../middleware/auth.js';
import Tweet from '../models/Schemas/TweetSchema.js';
import {getUser,getUserById} from '../controllers/userControllers.js';

const router = express.Router();


router.get('/',isAuth,getUser)

router.get('/:user',getUserById)

export default router;