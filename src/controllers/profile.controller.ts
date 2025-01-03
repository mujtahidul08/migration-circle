import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary';

const prisma = new PrismaClient();

export async function getProfileUser(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Ambil data user beserta relasi followers dan following
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        profile: {
          select: {
            bio: true,
            avatarImage: true,
            backgroundImage: true,
          },
        },
        following: {
          // User yang diikuti oleh kita
          select: {
            following: { // User yang kita ikuti
              select: { id: true, username: true },
            },
          },
        },
        follower: {
          // User yang mengikuti kita
          select: {
            follower: { // User yang mengikuti kita
              select: { id: true, username: true },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "Failed to fetch user profile" });
  }
}


export async function getAllByUser(req: Request, res: Response) {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const threads = await prisma.thread.findMany({
      where: {
        isDeleted: 0, 
        authorId: userId,
      },
      orderBy: { createdAt: 'desc' },
      select: {
          id: true,
          authorId: true,
          createdAt: true,
          updatedAt: true,
          content: true,
          image: true,
          author: {
              select: {
                  username: true,
                  email: true,
                  profile: { select: { avatarImage: true } },
              },
          },
          _count: {
              select: { like: true, replies: true },
          },
          like: {
              select: { userId: true },
          },
      },
  });

  // Tambahkan properti `isLike` berdasarkan data likes
  const threadsWithIsLike = threads.map((thread) => ({
      ...thread,
      isLike: thread.like.some((like) => like.userId === userId),
  }));

  res.status(200).json({
      message: 'Get all threads successful',
      threads: threadsWithIsLike,
  });
}catch (error) {
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
  console.log("Authenticated User ID:", userId);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }


  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: userId, // Data yang diikuti oleh user
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

    const result = following.map((f) => f.following); // Ambil detail pengguna yang diikuti

    res.status(200).json({ message: 'Following list fetched successfully', following: result });
  } catch (error) {
    console.error('Error fetching following:', error);
    res.status(500).json({ message: 'Error fetching following', error });
  }
}


export const getFollowers = async (req: Request, res: Response) => {
  try {
    // Pastikan user ID tersedia dari middleware authentication
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Query followers dari tabel Follow
    const followers = await prisma.follow.findMany({
      where: { followingId: userId }, // User yang diikuti oleh followers
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                avatarImage: true,
              },
            },
          },
        },
      },
    });

    // Format hasil untuk hanya mengambil data followers
    const formattedFollowers = followers.map((f) => ({
      id: f.follower.id,
      username: f.follower.username,
      email: f.follower.email,
      image: f.follower.profile?.avatarImage || null,
      isFollow: true, // Default true karena mereka adalah followers
    }));

    res.status(200).json({
      message: "Followers fetched successfully",
      followers: formattedFollowers,
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
// export async function getFollowers(req: Request, res: Response) {
//   const userId = (req as any).user?.id;

//   if (!userId || typeof userId !== "number") {
//     return res.status(400).json({ message: "Invalid user ID format." });
//   }

//   try {
//     const followers = await prisma.follow.findMany({
//       where: {
//         followingId: userId,
//       },
//       include: {
//         follower: {
//           select: {
//             id: true,
//             username: true,
//             email: true,
//             fullname: true,
//           },
//         },
//       },
//     });

//     const result = followers.map((f) => f.follower);

//     res.status(200).json({ followers: result });
//   } catch (error) {
//     console.error("Error fetching followers:", error);
//     res.status(500).json({ message: "Failed to fetch followers", error });
//   }
// }

// export async function getFollowers(req: Request, res: Response) {
//   // Ambil userId dari req.user yang didapatkan dari middleware authentication
//   const userId = (req as any).user?.id;

//   console.log("Authenticated User ID (Followers):", userId);

//   // Validasi userId untuk memastikan format yang benar
//   if (!userId || typeof userId !== 'number') {
//     return res.status(400).json({ message: 'Invalid Author ID format.' });
//   }

//   try {
//     // Mengambil followers berdasarkan followingId
//     const followers = await prisma.follow.findMany({
//       where: {
//         followingId: userId,
//       },
//       include: {
//         follower: {
//           select: {
//             id: true,
//             username: true,
//             email: true,
//             fullname: true,
//           },
//         },
//       },
//     });

//     // Ambil hanya data follower dari response
//     const result = followers.map((f) => f.follower);

//     res.status(200).json({ message: 'Followers list fetched successfully', followers: result });
//   } catch (error) {
//     console.error('Error fetching followers:', error);
//     res.status(500).json({ message: 'Error fetching followers', error });
//   }
// }

// export async function getFollowers(req: Request, res: Response) {
//   const userId = (req as any).user?.id;

//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

// try {
//   const followers = await prisma.follow.findMany({
//     where: {
//       followingId: userId,
//     },
//     include: {
//       follower: {
//         select: {
//           id: true,
//           username: true,
//           email: true,
//           fullname: true,
//         },
//       },
//     },
//   });

//   const result = followers.map((f) => f.follower);

//   res.status(200).json({ message: 'Followers list fetched successfully', followers: result });
// } catch (error) {
//   console.error('Error fetching followers:', error);
//   res.status(500).json({ message: 'Error fetching followers', error });
// }
// }


export async function suggestAccount(req: Request, res: Response) {
  const userId = (req as any).user?.id; 
  console.log("Authenticated User ID:", userId);
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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    console.log("Starting updateProfile...");

    const userId = (req as any).user?.id;

    console.log("User ID:", userId);

    const { username, email, bio } = req.body;
    console.log("Request Body:", { username, email, bio });

    let avatarUrl = undefined;
    let coverPicUrl = undefined;

    // Validasi format input
    const hasWhitespace = /\s/;
    if (username && hasWhitespace.test(username)) {
      console.warn("Username contains spaces:", username);
      return res.status(400).json({ message: "Username cannot contain spaces" });
    }
    if (email && hasWhitespace.test(email)) {
      console.warn("Email contains spaces:", email);
      return res.status(400).json({ message: "Email cannot contain spaces" });
    }

    // Cek keunikan username dan email
    if (username) {
      console.log("Checking username availability...");
      const existingUsername = await prisma.user.findUnique({ where: { username } });
      console.log("Existing Username:", existingUsername);
      if (existingUsername && existingUsername.id !== userId) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    if (email) {
      console.log("Checking email availability...");
      const existingEmail = await prisma.user.findUnique({ where: { email } });
      console.log("Existing Email:", existingEmail);
      if (existingEmail && existingEmail.id !== userId) {
        return res.status(400).json({ message: "Email is already taken" });
      }
    }

    // Proses file upload
    console.log("Processing file uploads...");
    const files = (req as any).files || {};
    console.log("Uploaded Files:", files);

    const avatarFile = files?.avatarImage?.[0];
    const backgroundFile = files?.backgroundImage?.[0];

    if (avatarFile) {
      console.log("Uploading avatar...");
      try {
        const avatarUpload = await cloudinary.uploader.upload(avatarFile.path, { folder: "avatars" });
        avatarUrl = avatarUpload.secure_url;
        console.log("Avatar uploaded:", avatarUrl);
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        return res.status(500).json({ message: "Failed to upload avatar" });
      }
    }

    if (backgroundFile) {
      console.log("Uploading background...");
      try {
        const backgroundUpload = await cloudinary.uploader.upload(backgroundFile.path, { folder: "backgrounds" });
        coverPicUrl = backgroundUpload.secure_url;
        console.log("Background uploaded:", coverPicUrl);
      } catch (error) {
        console.error("Failed to upload background:", error);
        return res.status(500).json({ message: "Failed to upload background" });
      }
    }

    // Update profile data
    console.log("Updating user profile in database...");
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        profile: {
          update: {
            bio,
            avatarImage: avatarUrl || undefined,
            backgroundImage: coverPicUrl || undefined,
          },
        },
      },
      include: { profile: true },
    });

    console.log("Profile updated successfully:", user);
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error: any) {
    console.error("Error updating profile:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
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
      isFollow: user.following?.some((f) => f.followingId === userId) || false, 
      followerCount: user.follower?.length || 0, 
    }));

    // Urutan berdasarkan: 1. `isFollow` descending, 2. `followerCount` descending
    suggestedUsers.sort((a, b) => {
      if (a.isFollow !== b.isFollow) return b.isFollow ? 1 : -1;
      return b.followerCount - a.followerCount;
    });

    res.status(200).json({ message: 'Suggested users retrieved', users: suggestedUsers });
  } catch (error) {
    console.error('Error fetching suggested users:', error);

    // Casting error ke tipe Error
    const err = error as Error;
    res.status(500).json({ message: 'Failed to fetch suggested users', error: err.message });
  }
}


// export async function getSuggestedUsers(req: Request, res: Response) {
//   const userId = (req as any).user?.id; 
//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     // Ambil semua user kecuali yang sedang login
//     const allUsers = await prisma.user.findMany({
//       where: {
//         id: { not: userId }, // Kecualikan diri sendiri
//         isDeleted: 0,
//       },
//       include: {
//         follower: true,
//         following: true,
//         profile: true,
//       },
//     });

//     // Hitung jumlah follower dan tandai apakah user ini follow kita
//     const suggestedUsers = allUsers.map((user) => ({
//       id: user.id,
//       username: user.username,
//       fullname: user.fullname || '',
//       avatar: user.profile?.avatarImage || '',
//       isFollow: user.follower.some((f) => f.followerId === userId),
//       followerCount: user.follower.length,
//     }));

//     // Urutkan berdasarkan: 1. `isFollow` descending, 2. `followerCount` descending
//     suggestedUsers.sort((a, b) => {
//       if (a.isFollow !== b.isFollow) return b.isFollow ? 1 : -1;
//       return b.followerCount - a.followerCount;
//     });

//     res.status(200).json({ message: 'Suggested users retrieved', users: suggestedUsers });
//   } catch (error) {        
//     res.status(500).json({ message: 'Failed to fetch suggested users', error });
//   }
// }

export async function FollowUser(req: Request, res: Response) {
  const followerId = parseInt((req as any).user.id); // User yang mengikuti
  const followingId = parseInt(req.params.id); // User yang diikuti

  if (isNaN(followerId) || isNaN(followingId)) {
    return res.status(400).json({ message: 'Follower ID and Following ID must be valid numbers' });
  }

  try {
    // Pastikan kedua pengguna ada di database
    const followerExists = await prisma.user.findUnique({ where: { id: followerId } });
    const followingExists = await prisma.user.findUnique({ where: { id: followingId } });

    if (!followerExists || !followingExists) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    // Cek apakah hubungan follow sudah ada
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });

    if (existingFollow) {
      // Jika sudah follow, maka unfollow
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
      // Jika belum follow, maka follow
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
    console.error('Error toggling follow status:', error);
    res.status(500).json({ message: 'Error toggling follow status', error });
  }
}



export const getProfileByAuthorId = async (req: Request, res: Response) => {
  const { authorId } = req.params;

  try {
    // Validasi apakah authorId ada dan valid
    if (!authorId) {
      return res.status(400).json({ message: "Author ID is required." });
    }

    const parsedAuthorId = parseInt(authorId, 10);
    if (isNaN(parsedAuthorId)) {
      return res.status(400).json({ message: " Author ID ada yang salah" });
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedAuthorId },
      select: {
        id: true,
        username: true,
        email: true,
        profile: {
          select: {
            bio: true,
            avatarImage: true,
            backgroundImage: true,
          },
        },
        threads: {
          where: { isDeleted: 0 },
          select: {
            id: true,
            content: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            _count: { select: { like: true, replies: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        following: {
          select: {
            following: {
              select: { id: true, username: true },
            },
          },
        },
        follower: {
          select: {
            follower: {
              select: { id: true, username: true },
            },
          },
        },
      },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile by authorId:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export async function getAllByAccount(req: Request, res: Response) {
  const { authorId } = req.params; // Ambil authorId dari parameter URL
  const userId = (req as any).user?.id; // Ambil userId dari token yang sudah diverifikasi

  if (!authorId) {
    return res.status(400).json({ message: 'Author ID is required' });
  }

  try {
    const threads = await prisma.thread.findMany({
      where: {
        isDeleted: 0,
        authorId: Number(authorId), // Konversi authorId menjadi number
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        content: true,
        image: true,
        author: {
          select: {
            username: true,
            email: true,
            profile: { select: { avatarImage: true } },
          },
        },
        _count: {
          select: { like: true, replies: true },
        },
        like: true, // Pastikan mengambil relasi like
      },
    });

    // Tambahkan properti `isLike` berdasarkan data likes
    const threadsWithIsLike = threads.map((thread) => ({
      ...thread,
      isLike: thread.like.some((like: { userId: number }) => like.userId === userId),
    }));

    res.status(200).json({
      message: 'Get all threads successful',
      threads: threadsWithIsLike,
    });
  } catch (error) {
    console.error('Error fetching all threads:', error);
    res.status(500).json({ message: 'Error fetching all threads', error });
  }
}


// export async function getFollowers(req: Request, res: Response) {
//   const userId = parseInt((req as any).user?.id, 10);
//   console.log("Authenticated User ID:", userId);

//   if (isNaN(userId)) {
//     return res.status(400).json({ message: 'Invalid Author ID format.' });
//   }
//   try {
//     const followers = await prisma.follow.findMany({
//       where: {
//         followingId: userId, 
//       },
//       include: {
//         follower: { 
//           select: {
//             id: true,
//             username: true,
//             email: true,
//             fullname: true,
//           },
//         },
//       },
//     });

//     const result = followers.map((f) => f.follower); 

//     res.status(200).json({ message: 'Followers list fetched successfully', followers: result });
//   } catch (error) {
//     console.error('Error fetching followers:', error);
//     res.status(500).json({ message: 'Error fetching followers', error });
//   }
// }
// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     console.log("Starting updateProfile...");

//     // Cast untuk mendapatkan userId
//     const userId = (req as any).user?.id; // Casting lokal
//     console.log("User ID:", userId);

//     const { username, email, bio } = req.body;
//     console.log("Request Body:", { username, email, bio });

//     let avatarUrl = undefined;
//     let coverPicUrl = undefined;

//     // Validasi format input
//     const hasWhitespace = /\s/;
//     if (username && hasWhitespace.test(username)) {
//       console.warn("Username contains spaces:", username);
//       return res.status(400).json({ message: "Username cannot contain spaces" });
//     }
//     if (email && hasWhitespace.test(email)) {
//       console.warn("Email contains spaces:", email);
//       return res.status(400).json({ message: "Email cannot contain spaces" });
//     }

//     // Cek keunikan username dan email
//     if (username) {
//       console.log("Checking username availability...");
//       const existingUsername = await prisma.user.findUnique({ where: { username } });
//       console.log("Existing Username:", existingUsername);
//       if (existingUsername && existingUsername.id !== userId) {
//         return res.status(400).json({ message: "Username is already taken" });
//       }
//     }

//     if (email) {
//       console.log("Checking email availability...");
//       const existingEmail = await prisma.user.findUnique({ where: { email } });
//       console.log("Existing Email:", existingEmail);
//       if (existingEmail && existingEmail.id !== userId) {
//         return res.status(400).json({ message: "Email is already taken" });
//       }
//     }

//     // Proses file upload
//     console.log("Processing file uploads...");
//     const files = (req as any).files || {}; // Casting lokal
//     console.log("Uploaded Files:", files);

//     const avatarFile = files?.avatarImage?.[0];
//     const backgroundFile = files?.backgroundImage?.[0];

//     if (avatarFile) {
//       console.log("Uploading avatar...");
//       try {
//         const avatarUpload = await cloudinary.uploader.upload(avatarFile.path, { folder: "avatars" });
//         avatarUrl = avatarUpload.secure_url;
//         console.log("Avatar uploaded:", avatarUrl);
//       } catch (error) {
//         console.error("Failed to upload avatar:", error);
//         return res.status(500).json({ message: "Failed to upload avatar" });
//       }
//     }

//     if (backgroundFile) {
//       console.log("Uploading background...");
//       try {
//         const backgroundUpload = await cloudinary.uploader.upload(backgroundFile.path, { folder: "backgrounds" });
//         coverPicUrl = backgroundUpload.secure_url;
//         console.log("Background uploaded:", coverPicUrl);
//       } catch (error) {
//         console.error("Failed to upload background:", error);
//         return res.status(500).json({ message: "Failed to upload background" });
//       }
//     }
