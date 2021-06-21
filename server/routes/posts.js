import express from "express";
import passport from "passport";
import {isAuth} from '../middleware/auth.js';
import {createPost} from '../controllers/postControllers.js';
const router = express.Router();

router.post('/create',isAuth,createPost);