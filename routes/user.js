import express from "express";
import {isAuth} from '../middleware/auth.js';
import {getUser,getUserById,validate} from '../controllers/userControllers.js';

const router = express.Router();


router.get('/',isAuth,getUser)
router.get('/validate',isAuth,validate)
router.get('/:user',getUserById)


export default router;