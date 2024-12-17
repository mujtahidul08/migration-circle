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

export async function getFollowing(req: Request, res: Response) {
  const userId = (req as any).user?.id; 

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: userId, 
      },
      include: {
        following: { 
          select: {
            id: true,
            username: true,
            email: true,
            fullname: true,
          },
        },
      },
    });

    const result = following.map((f) => f.following); 

    res.status(200).json({ message: 'Following list fetched successfully', following: result });
  } catch (error) {
    console.error('Error fetching following:', error);
    res.status(500).json({ message: 'Error fetching following', error });
  }
}

export async function getFollowers(req: Request, res: Response) {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId, 
      },
      include: {
        follower: { 
          select: {
            id: true,
            username: true,
            email: true,
            fullname: true,
          },
        },
      },
    });

    const result = followers.map((f) => f.follower); 

    res.status(200).json({ message: 'Followers list fetched successfully', followers: result });
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ message: 'Error fetching followers', error });
  }
}

export async function suggestAccount(req: Request, res: Response) {
  const userId = (req as any).user?.id; 

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const notFollowBack = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } }, 
          {
            follower: {
              some: {
                followerId: userId, 
              },
            },
          },
          {
            following: {
              none: {
                followingId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
      },
    });
    
    const usersNotFollowed = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          {
            follower: {
              none: {
                followerId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
      },
    });

    res.status(200).json({
      message: 'Suggested accounts fetched successfully',
      notFollowed: usersNotFollowed,
      notFollowBack: notFollowBack,
    });
  } catch (error) {
    console.error('Error fetching suggested accounts:', error);
    res.status(500).json({ message: 'Error fetching suggested accounts', error });
  }
}