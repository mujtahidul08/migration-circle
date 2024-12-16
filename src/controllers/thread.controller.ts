import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createThread(req: Request, res: Response) {
  const { content, authorId } = req.body;

  if (!content || !authorId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let imagePath: string | null = null;
  const file = req.file;
  if (req.file) {
    console.log(req.file);
    imagePath = req.file.filename;
  }

  let data = {
    content,
    authorId: parseInt(authorId),
    image: imagePath,
  };

  console.log('data :', data);

  try {
    const newThread = await prisma.thread.create({
      data,
    });

    res
      .status(201)
      .json({ message: 'Thread created successfully', thread: newThread });
  } catch (error) {
    res.status(500).json({ message: 'Error creating thread', error });
  }
}

export async function getAllThreads(req: Request, res: Response) {
  try {
    const allThreads = await prisma.thread.findMany({
      where: {
        isDeleted: 0,
      },
      select: {
        id: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        content: true,
        image: true,
        like:true,
        replies:true
      },
    });
    res
      .status(200)
      .json({ message: 'get all threads successful', threads: allThreads });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all threads', error });
  }
}

export async function updateThread(req: Request, res: Response) {
  const { content,image} = req.body;
  const threadId = parseInt(req.params.id)

  try {
    const thread = await prisma.thread.findUnique({ where: { id: threadId } });

    if (!thread) {
      return res.status(404).json({ message: 'user not found' });
    }

    const updatedData: any = {};
    if (content) updatedData.content = content;
    if (image) updatedData.image = image;

    const updatedUser = await prisma.thread.update({
      where: { id: threadId },
      data: updatedData,
    });

    res.status(200).json({
      message: 'thread updated successfully',
      thread: { content: updatedUser.content, image: updatedUser.image ? updatedUser.image : "" },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating thread', error });
  }
}

export async function deleteThread(req: Request, res: Response) {
  const threadId = parseInt(req.params.id);

  try {
    const threadExist = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!threadExist) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    if (threadExist.authorId !== (req as any).user.id) {
      return res
        .status(401)
        .json({ message: 'User not granted to delete this thread' });
    }

    if (threadExist.isDeleted === 1) {
      return res.status(400).json({ message: 'Thread is already deleted' });
    }

    await prisma.thread.update({
      where: {
        id: threadId,
      },
      data: {
        isDeleted: 1,
      },
    });

    res.status(200).json({ message: 'thread deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting thread', error });
  }
}

export async function likeThread(req: Request, res: Response) {  
  const userId = (req as any).user.id; 
  const threadId = parseInt(req.params.id);

  try {
    if (!userId || !threadId) {
      return res.status(400).json({ message: 'User ID and Thread ID are required' });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        threadId: threadId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return res.status(200).json({
        message: 'Like removed from thread',
        threadId: threadId,
        liked: false,
      });
    } else {
      await prisma.like.create({
        data: {
          userId: userId,
          threadId: threadId,
          isLike: 1, 
        },
      });
      return res.status(201).json({
        message: 'Thread liked successfully',
        threadId: threadId,
        liked: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking thread', error });
  }
}