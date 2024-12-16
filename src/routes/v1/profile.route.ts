import express from 'express';

import { authentication } from '../../middlewares/authentication';

const profileRoute = express.Router();

// profileRoute.get('/threads', authentication, getAllThreadsByUser);
// profileRoute.get('/images', authentication, getAllThreadsByImage);


export default profileRoute;