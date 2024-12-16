import express from 'express';

import { upload } from '../../middlewares/upload-file';
import { createThread, deleteThread, getAllThreads, likeThread, updateThread } from '../../controllers/thread.controller';
import { authentication } from '../../middlewares/authentication';

const threadRoute = express.Router();

threadRoute.post('/', authentication, upload, createThread);
threadRoute.get('/', authentication, getAllThreads);
threadRoute.delete('/:id', authentication, deleteThread);
threadRoute.put('/:id', authentication, updateThread);
// threadRoute.put(":id/replies", authentication, replyUser)
threadRoute.post('/like/:id', authentication,likeThread);


export default threadRoute;