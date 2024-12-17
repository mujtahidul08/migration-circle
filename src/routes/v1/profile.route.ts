import express from 'express';
import { authentication } from '../../middlewares/authentication';
import { FollowUser } from '../../controllers/user.controller';
import { getAllImagesByUser, getAllThreadsByUser, getFollowers, getFollowing, suggestAccount } from '../../controllers/profile.controller';

const profileRoute = express.Router();

profileRoute.post("/follow/:id",authentication, FollowUser)
profileRoute.post("/following",authentication, getFollowing)
profileRoute.post("/followers",authentication, getFollowers)
profileRoute.get('/threads', authentication, getAllThreadsByUser);
profileRoute.get('/images', authentication, getAllImagesByUser);
profileRoute.get('/suggest', authentication, suggestAccount);

export default profileRoute;