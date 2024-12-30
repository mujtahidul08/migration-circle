import express from 'express';
import { authentication } from '../../middlewares/authentication';
import { FollowUser, getAllImagesByUser, getAllThreadsByUser, getFollowers, getFollowing, getSuggestedUsers, updateProfile } from '../../controllers/profile.controller';

const profileRoute = express.Router();

profileRoute.put("/",authentication, updateProfile)
profileRoute.post("/follow/:id",authentication, FollowUser)
profileRoute.get("/following",authentication, getFollowing)
profileRoute.get("/followers",authentication, getFollowers)
profileRoute.get('/threads', authentication, getAllThreadsByUser);
profileRoute.get('/images', authentication, getAllImagesByUser);
profileRoute.get("/suggested", authentication, getSuggestedUsers);

export default profileRoute;