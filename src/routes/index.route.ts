import express, { Request, Response } from 'express';
import userRoute from './v1/users.route';
import authRoute from './v1/auth.route';
import threadRoute from './v1/threads.route';
import profileRoute from './v1/profile.route';
import searchRoute from './v1/search.route';


const router = express.Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/thread', threadRoute);
router.use('/profile', profileRoute);
router.use('/search', searchRoute);

export default router;