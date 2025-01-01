import express from 'express';
import { authentication } from '../../middlewares/authentication';
import { FollowUser, getAllImagesByUser, getAllThreadsByUser, getFollowers, getFollowing, getProfileByUsername, getProfileUser, getSuggestedUsers, updateProfile } from '../../controllers/profile.controller';
import upload, { uploadMultiple } from '../../middlewares/uploadToCloudinary';
const profileRoute = express.Router();

profileRoute.put("/",authentication,uploadMultiple, updateProfile)
profileRoute.get("/",authentication, getProfileUser)
profileRoute.post("/follow/:id",authentication, FollowUser)
profileRoute.get("/following",authentication, getFollowing)
profileRoute.get("/followers",authentication, getFollowers)
profileRoute.get('/threads', authentication, getAllThreadsByUser);
profileRoute.get('/images', authentication, getAllImagesByUser);
profileRoute.get("/suggested", authentication, getSuggestedUsers);
profileRoute.get("/:username", authentication, getProfileByUsername); 

export default profileRoute;