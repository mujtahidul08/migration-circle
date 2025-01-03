import express from 'express';
import { authentication } from '../../middlewares/authentication';
import { FollowUser, getAllByAccount, getAllByUser, getFollowers, getFollowing, getProfileByAuthorId, getProfileUser, getSuggestedUsers, updateProfile } from '../../controllers/profile.controller';
import  { uploadMultiple } from '../../middlewares/uploadToCloudinary';
const profileRoute = express.Router();


profileRoute.put("/",authentication,uploadMultiple, updateProfile)
profileRoute.get("/",authentication, getProfileUser)
profileRoute.get("/followers", authentication, getFollowers);

profileRoute.get("/following", authentication, getFollowing);
profileRoute.get("/suggested", authentication, getSuggestedUsers);
profileRoute.get('/user', authentication, getAllByUser);

profileRoute.get("/:authorId", authentication, getProfileByAuthorId);


profileRoute.get('/account/:authorId', authentication, getAllByAccount);

profileRoute.post("/follow/:id",authentication, FollowUser)



export default profileRoute;