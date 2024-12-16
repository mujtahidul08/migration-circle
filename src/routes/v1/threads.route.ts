import express from 'express';

import { upload } from '../../middlewares/upload-file';
import { createThread, deleteThread, getAllThreads, likeThread, updateThread } from '../../controllers/thread.controller';
import { authentication } from '../../middlewares/authentication';
import { createReply, deleteReply, getAllReply, likeReply } from '../../controllers/replies.controller';

const threadRoute = express.Router();

threadRoute.post('/', authentication, upload, createThread);
threadRoute.get('/', authentication, getAllThreads);
threadRoute.delete('/:id', authentication, deleteThread);
threadRoute.put('/:id', authentication, updateThread);
threadRoute.post("/replies/:id", authentication, upload, createReply)
threadRoute.get('/replies/:id', authentication, getAllReply);
threadRoute.delete('/replies/:id', authentication, deleteReply);
threadRoute.post('/replies/:id/like', authentication, likeReply);
threadRoute.post('/like/:id', authentication,likeThread);


export default threadRoute;