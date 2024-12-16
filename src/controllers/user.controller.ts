import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const SECRET_KEY =
  process.env.SECRET_KEY || 'aksjdkl2aj3djaklfji32dj2dj9ld92jd92j';

const prisma = new PrismaClient();

export async function getAllUsers(req: Request, res: Response) {
  const allUsers = await prisma.user.findMany({
    select: {
      username: true,
      email: true,
      fullname: true,
    },
  });
  res.json({ message: 'get all users successful', users: allUsers });
}

export async function updateUser(req: Request, res: Response) {
  const { username, email, id } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const updatedData: any = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;

    if (username || email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username || undefined },
            { email: email || undefined },
          ],
          NOT: { id: Number(id) },
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'username or email already in use' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({
      message: 'User updated successfully',
      user: { email: updatedUser.email, username: updatedUser.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user', error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id);

  try {
    const userExist = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExist) {
      return res.status(404).json({ message: 'user not found' });
    }

    if (userExist.isDeleted === 1) {
      return res.status(400).json({ message: 'user is already deleted' });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: 1,
      },
    });

    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
}

export async function FollowUser(req: Request, res: Response) {
  const followerId = parseInt((req as any).user.id);
  const followingId = parseInt(req.params.id);

  if (isNaN(followerId) || isNaN(followingId)) {
    return res.status(400).json({ message: 'Follower ID and Following ID must be valid numbers' });
  }

  try {
    const followerExists = await prisma.user.findUnique({ where: { id: followerId } });
    const followingExists = await prisma.user.findUnique({ where: { id: followingId } });

    if (!followerExists || !followingExists) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
      return res.status(200).json({
        message: 'Unfollowed the user',
        followed: false,
      });
    } else {
      await prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });
      return res.status(201).json({
        message: 'Followed the user',
        followed: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error toggling follow status', error });
  }
}