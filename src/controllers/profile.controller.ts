import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllThreadsByUser(req: Request, res: Response) {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const allThreads = await prisma.thread.findMany({
      where: {
        isDeleted: 0, 
        authorId: userId,
      },
      select: {
        id: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        content: true,
        image: true,
        like: true, 
      },
    });

    res
      .status(200)
      .json({ message: 'Get all threads successful', threads: allThreads });
  } catch (error) {
    console.error('Error fetching all threads:', error);
    res.status(500).json({ message: 'Error fetching all threads', error });
  }
}

export async function getAllImagesByUser(req: Request, res: Response) {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const allImages = await prisma.thread.findMany({
      where: {
        authorId: userId,
        image: { not: null }, 
      },
      select: {
        image: true,
      },
    });

    const images = allImages.map(thread => thread.image);

    res.status(200).json({
      message: 'Get all images successful',
      images, 
    });
  } catch (error) {
    console.error('Error fetching all images:', error);
    res.status(500).json({ message: 'Error fetching all images', error });
  }
}
