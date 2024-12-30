import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary';

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

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     const { username, email, bio } = req.body;

//     if (!username || !email) {
//       return res.status(400).json({ message: "Username and email are required" });
//     }

//     // File URL yang akan disimpan di database
//     let avatarImage: string | null = null;
//     let backgroundImage: string | null = null;

//     // Proses upload ke Cloudinary jika file tersedia
//     if (req.files) {
//       const files = req.files as { [fieldname: string]: Express.Multer.File[] };

//       // Upload avatarImage jika ada
//       if (files.avatarImage) {
//         const result = await cloudinary.uploader.upload(files.avatarImage[0].path, {
//           folder: 'profile-avatars',
//         });
//         avatarImage = result.secure_url;
//       }

//       // Upload backgroundImage jika ada
//       if (files.backgroundImage) {
//         const result = await cloudinary.uploader.upload(files.backgroundImage[0].path, {
//           folder: 'profile-backgrounds',
//         });
//         backgroundImage = result.secure_url;
//       }
//     }

//     // Update user dan profile di database
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username,
//         email,
//         profile: {
//           update: {
//             bio,
//             ...(avatarImage && { avatarImage }),
//             ...(backgroundImage && { backgroundImage }),
//           },
//         },
//       },
//       include: {
//         profile: true,
//       },
//     });

//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { username, email, bio } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        profile: {
          update: { bio },
        },
      },
      include: {
        profile: true,
      },
    });

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export async function getSuggestedUsers(req: Request, res: Response) {
  const userId = (req as any).user?.id; 
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Ambil semua user kecuali yang sedang login
    const allUsers = await prisma.user.findMany({
      where: {
        id: { not: userId }, // Kecualikan diri sendiri
        isDeleted: 0,
      },
      include: {
        follower: true,
        following: true,
        profile: true,
      },
    });

    // Hitung jumlah follower dan tandai apakah user ini follow kita
    const suggestedUsers = allUsers.map((user) => ({
      id: user.id,
      username: user.username,
      fullname: user.fullname || '',
      avatar: user.profile?.avatarImage || '',
      isFollow: user.follower.some((f) => f.followerId === userId),
      followerCount: user.follower.length,
    }));

    // Urutkan berdasarkan: 1. `isFollow` descending, 2. `followerCount` descending
    suggestedUsers.sort((a, b) => {
      if (a.isFollow !== b.isFollow) return b.isFollow ? 1 : -1;
      return b.followerCount - a.followerCount;
    });

    res.status(200).json({ message: 'Suggested users retrieved', users: suggestedUsers });
  } catch (error) {        
    res.status(500).json({ message: 'Failed to fetch suggested users', error });
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

