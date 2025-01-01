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

// export async function getProfileUser(req: Request, res: Response) {
//   try {
//     const userId = (req as any).user?.id;

//     if (!userId) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Ambil data user beserta relasi followers dan following
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         profile: {
//           select: {
//             bio: true,
//             avatarImage: true,
//             backgroundImage: true,
//           },
//         },
//         following: {
//           // User yang sedang kita ikuti
//           select: {
//             following: {
//               select: { id: true, username: true },
//             },
//           },
//         },
//         follower: {
//           // User yang mengikuti kita
//           select: {
//             follower: {
//               select: { id: true, username: true },
//             },
//           },
//         },
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.json(user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return res.status(500).json({ error: "Failed to fetch user profile" });
//   }
// }
// export async function getProfileUser(req: Request, res: Response) {
//   try {
//     const userId = (req as any).user?.id;

//     if (!userId) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Cari user beserta informasi terkait
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         profile: {
//           select: {
//             bio: true,
//             avatarImage: true,
//             backgroundImage: true,
//           },
//         },
//         following: {
//           select: {
//             following: {
//               select: { id: true, username: true },
//             },
//           },
//         },
//         follower: {
//           select: {
//             follower: {
//               select: { id: true, username: true },
//             },
//           },
//         },
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.json(user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return res.status(500).json({ error: "Failed to fetch user profile" });
//   }
// }

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
// export async function getFollowing(req: Request, res: Response) {
//   const userId = (req as any).user?.id; 

//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized access' });
//   }

//   try {
//     const following = await prisma.follow.findMany({
//       where: {
//         followerId: userId, 
//       },
//       include: {
//         following: { 
//           select: {
//             id: true,
//             username: true,
//             email: true,
//             fullname: true,
//           },
//         },
//       },
//     });

//     const result = following.map((f) => f.following); 

//     res.status(200).json({ message: 'Following list fetched successfully', following: result });
//   } catch (error) {
//     console.error('Error fetching following:', error);
//     res.status(500).json({ message: 'Error fetching following', error });
//   }
// }

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

//     // Update profile data
//     console.log("Updating user profile in database...");
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username,
//         email,
//         profile: {
//           update: {
//             bio,
//             avatarImage: avatarUrl || undefined,
//             backgroundImage: coverPicUrl || undefined,
//           },
//         },
//       },
//       include: { profile: true },
//     });

//     console.log("Profile updated successfully:", user);
//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error: any) {
//     console.error("Error updating profile:", error.message, error.stack);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const updateProfile = async (req: CustomRequest, res: Response) => {
//   try {
//     console.log("Starting updateProfile...");

//     const userId = (req as any).user?.id;
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
//     const files = (req as any).files || {};
//     console.log("Uploaded Files:", files);

//     const avatarFile = files?.avatarImage?.[0];
//     const backgroundFile = files?.backgroundImage?.[0];

//     if (avatarFile) {
//       console.log("Uploading avatar...");
//       try {
//         const avatarUpload = await cloudinary.uploader.upload(avatarFile.path, {
//           folder: "avatars",
//         });
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
//         const backgroundUpload = await cloudinary.uploader.upload(backgroundFile.path, {
//           folder: "backgrounds",
//         });
//         coverPicUrl = backgroundUpload.secure_url;
//         console.log("Background uploaded:", coverPicUrl);
//       } catch (error) {
//         console.error("Failed to upload background:", error);
//         return res.status(500).json({ message: "Failed to upload background" });
//       }
//     }

//     // Update profile data
//     console.log("Updating user profile in database...");
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username,
//         email,
//         profile: {
//           update: {
//             bio,
//             avatarImage: avatarUrl || undefined,
//             backgroundImage: coverPicUrl || undefined,
//           },
//         },
//       },
//       include: {
//         profile: true,
//       },
//     });

//     console.log("Profile updated successfully:", user);
//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error: any) {
//     console.error("Error updating profile:", error.message, error.stack);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };


// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     const { username, email, bio } = req.body; // Ambil data dari body
//     let avatarUrl = undefined;
//     let coverPicUrl = undefined;

//     // Validasi format input
//     const hasWhitespace = /\s/;
//     if (username && hasWhitespace.test(username)) {
//       return res.status(400).json({ message: "Username cannot contain spaces" });
//     }
//     if (email && hasWhitespace.test(email)) {
//       return res.status(400).json({ message: "Email cannot contain spaces" });
//     }

//     // Cek keunikan username dan email
//     if (username) {
//       const existingUsername = await prisma.user.findUnique({ where: { username } });
//       if (existingUsername && existingUsername.id !== userId) {
//         return res.status(400).json({ message: "Username is already taken" });
//       }
//     }

//     if (email) {
//       const existingEmail = await prisma.user.findUnique({ where: { email } });
//       if (existingEmail && existingEmail.id !== userId) {
//         return res.status(400).json({ message: "Email is already taken" });
//       }
//     }

//     // Proses file upload
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // Tipekan `req.files`

//     const avatarFile = files?.avatarImage?.[0]; // Ambil file pertama dari avatarImage
//     const backgroundFile = files?.backgroundImage?.[0]; // Ambil file pertama dari backgroundImage

//     // Upload avatar ke Cloudinary
//     if (avatarFile) {
//       try {
//         const avatarUpload = await cloudinary.uploader.upload(avatarFile.path, {
//           folder: "avatars",
//         });
//         avatarUrl = avatarUpload.secure_url;
//       } catch (error) {
//         console.error("Failed to upload avatar:", error);
//         return res.status(500).json({ message: "Failed to upload avatar" });
//       }
//     }

//     // Upload background ke Cloudinary
//     if (backgroundFile) {
//       try {
//         const backgroundUpload = await cloudinary.uploader.upload(backgroundFile.path, {
//           folder: "backgrounds",
//         });
//         coverPicUrl = backgroundUpload.secure_url;
//       } catch (error) {
//         console.error("Failed to upload background:", error);
//         return res.status(500).json({ message: "Failed to upload background" });
//       }
//     }

//     // Update profile data
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username, // Update username
//         email, // Update email
//         profile: {
//           update: {
//             bio, // Update bio
//             avatarImage: avatarUrl || undefined,
//             backgroundImage: coverPicUrl || undefined,
//           },
//         },
//       },
//       include: {
//         profile: true,
//       },
//     });

//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error: any) {
//     console.error("Error updating profile:", error.message, error.stack);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     const { username, email, bio } = req.body;  // Ambil data dari body
//     let avatarUrl = undefined;
//     let coverPicUrl = undefined;

//     // Proses file upload
//     if (req.file) {
//       const avatarFile = req.file.avatarImage ? req.file.avatarImage[0] : undefined;
//       const backgroundFile = req.file.backgroundImage ? req.file.backgroundImage[0] : undefined;

//       // Upload avatar ke Cloudinary
//       if (avatarFile) {
//         try {
//           const avatarUpload = await cloudinary.uploader.upload(avatarFile.path, {
//             folder: "avatars",
//           });
//           avatarUrl = avatarUpload.secure_url;
//         } catch (error) {
//           console.error("Failed to upload avatar:", error);
//           return res.status(500).json({ message: "Failed to upload avatar" });
//         }
//       }

//       // Upload background ke Cloudinary
//       if (backgroundFile) {
//         const backgroundUpload = await cloudinary.uploader.upload(backgroundFile.path, {
//           folder: "backgrounds",
//         });
//         coverPicUrl = backgroundUpload.secure_url;
//       }
//     }

    // Update profile data
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username, // Update username
//         email, // Update email
//         profile: {
//           update: {
//             bio, // Update bio
//             avatarImage: avatarUrl || undefined,
//             backgroundImage: coverPicUrl || undefined,
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

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     console.log("Body Data:", req.body);
//     console.log("Files:", req.files);

//     const { bio } = req.body;  // Hanya perlu bio untuk update

//     // Proses file upload
//     let avatarUrl = undefined;
//     let coverPicUrl = undefined;

//     if (req.files) {
//       const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//       avatarUrl = files.avatar ? files.avatar[0].path : undefined;
//       coverPicUrl = files.coverPic ? files.coverPic[0].path : undefined;
//     }

//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         profile: {
//           update: {
//             bio,
//             avatarImage: avatarUrl || undefined,
//             backgroundImage: coverPicUrl || undefined,
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
// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     console.log("Body Data:", req.body);
//     console.log("Files:", req.files);

//     const { username, email, bio } = req.body;

//     if (!username || !email) {
//       return res.status(400).json({ message: "Username and email are required" });
//     }

//     // Proses file upload
//     let avatarUrl = undefined;
//     let coverPicUrl = undefined;

//     if (req.files) {
//       const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//       avatarUrl = files.avatar ? files.avatar[0].path : undefined;
//       coverPicUrl = files.coverPic ? files.coverPic[0].path : undefined;
//     }

//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username,
//         email,
//         profile: {
//           update: {
//             bio,
//             avatarImage: avatarUrl || undefined,
//             backgroundImage: coverPicUrl || undefined,
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

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     const { username, email, bio } = req.body;

//     if (!username || !email) {
//       return res.status(400).json({ message: 'Username and email are required' });
//     }

//     // Ambil URL gambar dari Cloudinary melalui multer
//     let avatarUrl = undefined;
//     let coverPicUrl = undefined;

//     if (req.files) {
//       const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//       if (files.avatar) {
//         avatarUrl = files.avatar[0].path; // URL dari Cloudinary
//       }
//       if (files.coverPic) {
//         coverPicUrl = files.coverPic[0].path; // URL dari Cloudinary
//       }
//     }

//     // Update data di database
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username,
//         email,
//         profile: {
//           update: {
//             bio,
//             avatarImage: avatarUrl || undefined,
//             backgroundImage: coverPicUrl || undefined,
//           },
//         },
//       },
//       include: {
//         profile: true,
//       },
//     });

//     res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     const { username, email, bio } = req.body;

//     if (!username || !email) {
//       return res.status(400).json({ message: 'Username and email are required' });
//     }

//     // Upload gambar avatar dan background jika ada
//     let avatarImageUrl = undefined;
//     let backgroundImageUrl = undefined;

//     if (req.files) {
//       const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//       if (files.avatarImage) {
//         avatarImageUrl = await uploadImage(files.avatarImage[0].path);
//       }
//       if (files.backgroundImage) {
//         backgroundImageUrl = await uploadImage(files.backgroundImage[0].path);
//       }
//     }

//     // Update data di database
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username,
//         email,
//         profile: {
//           update: {
//             bio,
//             avatarImage: avatarImageUrl || undefined,
//             backgroundImage: backgroundImageUrl || undefined,
//           },
//         },
//       },
//       include: {
//         profile: true,
//       },
//     });

//     res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

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

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user?.id;
//     const { username, email, bio } = req.body;

//     if (!username || !email) {
//       return res.status(400).json({ message: "Username and email are required" });
//     }

//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         username,
//         email,
//         profile: {
//           update: { bio },
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
      isFollow: user.following.some((f) => f.followingId === userId), // Perbaikan di sini
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

// export async function FollowUser(req: Request, res: Response) {
//   const followerId = parseInt((req as any).user.id);
//   const followingId = parseInt(req.params.id);

//   if (isNaN(followerId) || isNaN(followingId)) {
//     return res.status(400).json({ message: 'Follower ID and Following ID must be valid numbers' });
//   }

//   try {
//     const followerExists = await prisma.user.findUnique({ where: { id: followerId } });
//     const followingExists = await prisma.user.findUnique({ where: { id: followingId } });

//     if (!followerExists || !followingExists) {
//       return res.status(404).json({ message: 'One or both users not found' });
//     }

//     const existingFollow = await prisma.follow.findUnique({
//       where: {
//         followerId_followingId: {
//           followerId: followerId,
//           followingId: followingId,
//         },
//       },
//     });

//     if (existingFollow) {
//       await prisma.follow.delete({
//         where: {
//           id: existingFollow.id,
//         },
//       });
//       return res.status(200).json({
//         message: 'Unfollowed the user',
//         followed: false,
//       });
//     } else {
//       await prisma.follow.create({
//         data: {
//           followerId,
//           followingId,
//         },
//       });
//       return res.status(201).json({
//         message: 'Followed the user',
//         followed: true,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error toggling follow status', error });
//   }
// }

export const getProfileByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    // Mencari user berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,  // Mengambil profil yang terkait
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mengembalikan data profil beserta informasi pengguna lainnya
    res.json({
      username: user.username,
      email: user.email,
      bio: user.profile?.bio || null,
      avatarImage: user.profile?.avatarImage || null,
      // followers: user.following.length,
      // following: user.follower.length, 
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};