import express from 'express';
import { createThread, deleteThread, getAllThreads, getThreadById, likeThread, updateThread } from '../../controllers/thread.controller';
import { authentication } from '../../middlewares/authentication';
import { createReply, deleteReply, getAllReply, likeReply } from '../../controllers/replies.controller';
import upload from '../../middlewares/uploadToCloudinary';

const threadRoute = express.Router();

threadRoute.post('/', authentication, upload.single('image'), createThread);
threadRoute.get('/', authentication, getAllThreads);
threadRoute.get("/:id", getThreadById);
threadRoute.delete('/:id', authentication, deleteThread);
threadRoute.put('/:id', authentication,upload.single('image'), updateThread);
threadRoute.post("/replies/:id", authentication, upload.single('image'), createReply)
threadRoute.get('/replies/:id', authentication, getAllReply);
threadRoute.delete('/replies/:id', authentication, deleteReply);
threadRoute.post('/replies/:id/like', authentication, likeReply);
threadRoute.post('/like/:id', authentication,likeThread);


export default threadRoute;