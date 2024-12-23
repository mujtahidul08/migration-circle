import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createReply(req: Request, res: Response) {
  const {content} = req.body;
  const threadId = parseInt(req.params.id)
  const authorId = (req as any).user?.id;

  if (!content || !authorId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let imagePath: string | null = null;
  const file = req.file;
  if (req.file) {
    console.log(req.file);
    imagePath = req.file.filename;
  }

  try {
    const newReply = await prisma.reply.create({
      data : {
        content,
        authorId,
        threadId,
        image: imagePath,
      }
    });

    res
      .status(201)
      .json({ message: 'Reply created successfully', thread: newReply });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reply', error });
  }
}


export async function deleteReply(req: Request, res: Response) {
    const replyId = parseInt(req.params.id);
    const userId = (req as any).user?.id;
  
    if (isNaN(replyId)) {
      return res.status(400).json({ message: 'Invalid Reply ID' });
    }
  
    try {
      const reply = await prisma.reply.findUnique({ where: { id: replyId } });
  
      if (!reply) {
        return res.status(404).json({ message: 'Reply not found' });
      }
  
      if (reply.authorId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this reply' });
      }
  
      await prisma.reply.delete({ where: { id: replyId } });
  
      res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
      console.error('Error deleting reply:', error);
      res.status(500).json({ message: 'Error deleting reply', error });
    }
  }


export async function likeReply(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    const replyId = parseInt(req.params.id);
  
    if (!userId || !replyId) {
      return res.status(400).json({ message: 'User ID and Reply ID are required' });
    }
  
    try {
      const existingLike = await prisma.like.findFirst({
        where: {
          userId,
          replyId,
        },
      });
  
      if (existingLike) {
        await prisma.like.delete({ where: { id: existingLike.id } });
        return res.status(200).json({
          message: 'Like removed from reply',
          replyId,
          liked: false,
        });
      } else {
        await prisma.like.create({
          data: {
            userId,
            replyId,
            isLike: 1,
          },
        });
        return res.status(201).json({
          message: 'Reply liked successfully',
          replyId,
          liked: true,
        });
      }
    } catch (error) {
      console.error('Error liking reply:', error);
      res.status(500).json({ message: 'Error liking reply', error });
    }
  }
    
  export async function getAllReply(req: Request, res: Response) {
    const threadId = parseInt(req.params.id);
  
    if (isNaN(threadId)) {
      return res.status(400).json({ message: "Invalid Thread ID" });
    }
  
    try {
      const replies = await prisma.reply.findMany({
        where: { threadId },
        include: {
          author: { select: { username: true, profile: { select: { avatarImage: true } } } },
        },
        orderBy: { createdAt: "desc" }, 
      });
  
      res.status(200).json(replies);
    } catch (error) {
      console.error("Error fetching replies:", error);
      res.status(500).json({ message: "Error fetching replies", error });
    }
  }