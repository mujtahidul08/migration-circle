import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary';

const prisma = new PrismaClient();

export async function createThread(req: Request, res: Response) {
  const { content, image } = req.body;
  const authorId = (req as any).user.id;
  console.log('Image URL from req.body:', image);  // Debugging untuk image yang diterima dari body

  if (image) {
    console.log('Received image from body:', image);
  } else {
    console.log('No image received from body');
  }

  // Memeriksa apakah file diterima dengan benar
  if (req.file) {
    console.log('Received image file:', req.file);  // Debugging untuk file yang diterima
  } else {
    console.log('No image file received');
  }

  if (!content || !authorId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let imagePath: string | null = null;

  // Jika file diterima, upload ke Cloudinary
  if (req.file) {
    try {
      // Upload file ke Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'circle-app', // Folder di Cloudinary
      });

      // Dapatkan URL gambar dari Cloudinary
      imagePath = result.secure_url;
      console.log('Uploaded image URL:', imagePath);  // URL gambar yang di-upload ke Cloudinary
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return res.status(500).json({ message: "Error uploading image", error });
    }
  }

  const data = {
    content,
    authorId: parseInt(authorId),
    image: imagePath || image, // Menyimpan URL gambar dari Cloudinary atau URL yang dikirim
  };

  console.log('Thread data to create:', data);  // Data yang akan disimpan ke database

  try {
    const newThread = await prisma.thread.create({
      data,
    });

    res.status(201).json({ message: "Thread created successfully", thread: newThread });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ message: "Error creating thread", error });
  }
}

export async function getAllThreads(req: Request, res: Response) {
  const { userId } = req.body; // Pastikan `userId` dari pengguna yang login dikirim dari frontend
  try {
      const threads = await prisma.thread.findMany({
          where: { isDeleted: 0 },
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
  } catch (error) {
      console.error('Error in getAllThreads:', error);
      res.status(500).json({ message: 'Error fetching threads', error });
  }
}

// export async function getAllThreads(req: Request, res: Response) {
//   try {    
//     const allThreads = await prisma.thread.findMany({
//       where: {
//         isDeleted: 0,
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//       select: {
//         id: true,
//         authorId: true,
//         createdAt: true,
//         updatedAt: true,
//         content: true,
//         image: true,
//         _count: {
//           select: {
//             replies: true, // Menghitung jumlah replies
//             like: true,    // Menghitung jumlah likes
//           },
//         },
//         author: {
//           select: {
//             username: true,
//             email: true,
//             profile: true,
//           },
//         },
//       },
//     });

//     res.status(200).json({
//       message: 'Get all threads successful',
//       threads: allThreads,
//     });
//   } catch (error) {
//     console.error('Error in getAllThreads:', error);
//     res.status(500).json({ message: 'Error fetching all threads', error });
//   }
// }

// export async function getAllThreads(req: Request, res: Response) {
//   try {    
//     const allThreads = await prisma.thread.findMany({
//       where: {
//         isDeleted: 0,
//       },
//       orderBy: {
//         createdAt: 'desc', // Urutkan berdasarkan createdAt descending
//       },
//       select: {
//         id: true,
//         authorId: true,
//         createdAt: true,
//         updatedAt: true,
//         content: true,
//         image: true,
//         like: true,
//         replies: true,
//         author: {
//           select: {
//             username: true,
//             email: true,
//             profile: true
//           },
//         },
//       },
//     });

//     res
//       .status(200)
//       .json({ message: 'Get all threads successful', threads: allThreads });
//   } catch (error) {
//     console.error('Error in getAllThreads:', error);
//     res.status(500).json({ message: 'Error fetching all threads', error });
//   }
// }
// export async function getThreadsByUser(req: Request, res: Response) {
//   const userId = req.user?.id; // Asumsi Anda sudah mengautentikasi user dan menyimpan `user.id` dalam `req.user`
//   try {
//     const threads = await prisma.thread.findMany({
//       where: {
//         authorId: userId, // Filter hanya thread milik user yang sedang login
//       },
//       include: {
//         author: true,
//         replies: {
//           include: {
//             like: true,
//           },
//         },
//       },
//     });

//     if (threads.length === 0) {
//       return res.status(404).json({ message: "Nothing Thread" });
//     }

//     res.status(200).json(threads);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching threads by user", error });
//   }
// }

// export async function getThreadById(req: Request, res: Response) {
//   const threadId = parseInt(req.params.id);
//   console.log(`Fetching thread with ID: ${threadId}`);
//   try {
//     const thread = await prisma.thread.findUnique({
//       where: { id: threadId },
//       include: {
//         author: true,
//         replies: {
//           include: {
//             like: true,
//           },
//         },
//       },
//     });

//     if (!thread) {
//       return res.status(404).json({ message: "Thread not found" });
//     }

//     res.status(200).json(thread);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching thread detail", error });
//   }
// }

export async function updateThread(req: Request, res: Response) {
  const { content, fileUrl } = req.body;
  const threadId = parseInt(req.params.id);
  const userId = (req as any).user?.id;

  try {
    const thread = await prisma.thread.findUnique({ where: { id: threadId } });

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    const updatedData: any = {};
    if (content) updatedData.content = content;
    if (fileUrl) updatedData.image = fileUrl;

    const updatedThread = await prisma.thread.update({
      where: { id: threadId },
      data: updatedData,
    });

    res.status(200).json({
      message: 'Thread updated successfully',
      thread: updatedThread,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating thread', error });
  }
}

// export async function updateThread(req: Request, res: Response) {
//   const { content,image} = req.body;
//   const threadId = parseInt(req.params.id)
//   const userId = (req as any).user?.id; 

//   try {
//     const thread = await prisma.thread.findUnique({ where: { id: threadId } });

//     if (!thread ) {
//       return res.status(404).json({ message: 'user not found' });
//     }

//     // if ( thread.authorId !== userId) {
//     //   return res
//     //     .status(401)
//     //     .json({ message: 'User not granted to update this thread'});
//     // }

//     const updatedData: any = {};
//     if (content) updatedData.content = content;
//     if (image) updatedData.image = image;

//     const updatedUser = await prisma.thread.update({
//       where: { id: threadId },
//       data: updatedData,
//     });

//     res.status(200).json({
//       message: 'thread updated successfully',
//       thread: { content: updatedUser.content, image: updatedUser.image ? updatedUser.image : "" },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating thread', error });
//   }
// }

export async function deleteThread(req: Request, res: Response) {
  const threadId = parseInt(req.params.id);
  const userId = (req as any).user?.id; // Pastikan Anda sudah mengonfirmasi user login

  try {
    // Cek apakah thread yang diminta milik user yang sedang login
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    if (thread.authorId !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this thread" });
    }

    // Hapus thread
    await prisma.thread.delete({
      where: { id: threadId },
    });

    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error("Error deleting thread", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// export async function deleteThread(req: Request, res: Response) {
//   const threadId = parseInt(req.params.id);

//   try {
//     const threadExist = await prisma.thread.findUnique({
//       where: { id: threadId },
//     });

//     if (!threadExist) {
//       return res.status(404).json({ message: 'Thread not found' });
//     }

//     if (threadExist.authorId !== (req as any).user.id) {
//       return res
//         .status(401)
//         .json({ message: 'User not granted to delete this thread' });
//     }

//     if (threadExist.isDeleted === 1) {
//       return res.status(400).json({ message: 'Thread is already deleted' });
//     }

//     await prisma.thread.update({
//       where: {
//         id: threadId,
//       },
//       data: {
//         isDeleted: 1,
//       },
//     });

//     res.status(200).json({ message: 'thread deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting thread', error });
//   }
// }


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
      // Remove like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // Add like
      await prisma.like.create({
        data: {
          userId: userId,
          threadId: threadId,
          isLike: 1, 
        },
      });
    }

    // Recalculate the like count
    const updatedLikeCount = await prisma.like.count({
      where: { threadId: threadId },
    });

    return res.status(200).json({
      message: existingLike ? 'Like removed from thread' : 'Thread liked successfully',
      threadId: threadId,
      liked: !existingLike,
      likeCount: updatedLikeCount,
    });
    
  } catch (error) {
    console.error('Error liking thread:', error);
    res.status(500).json({ message: 'Error liking thread', error });
  }
}

// export async function likeThread(req: Request, res: Response) {  
//   const userId = (req as any).user.id; 
//   const threadId = parseInt(req.params.id);

//   try {
//     if (!userId || !threadId) {
//       return res.status(400).json({ message: 'User ID and Thread ID are required' });
//     }

//     const existingLike = await prisma.like.findFirst({
//       where: {
//         userId: userId,
//         threadId: threadId,
//       },
//     });

//     if (existingLike) {
//       await prisma.like.delete({
//         where: {
//           id: existingLike.id,
//         },
//       });
//       return res.status(200).json({
//         message: 'Like removed from thread',
//         threadId: threadId,
//         liked: false,
//       });
//     } else {
//       await prisma.like.create({
//         data: {
//           userId: userId,
//           threadId: threadId,
//           isLike: 1, 
//         },
//       });
//       return res.status(201).json({
//         message: 'Thread liked successfully',
//         threadId: threadId,
//         liked: true,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error liking thread', error });
//   }
// }

export async function getThreadById(req: Request, res: Response) {
  const threadId = parseInt(req.params.id);
  console.log(`Fetching thread with ID: ${threadId}`);
  try {
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        author: {
          select: {
            username: true,
            email: true,
            profile: {
              select: {
                avatarImage: true,
              },
            },
          },
        },
        replies: true,
        _count: {
          select: {
            like: true,
            replies: true,
          },
        },
      },
    });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    res.status(200).json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching thread detail", error });
  }
}

// export async function getThreadById(req: Request, res: Response) {
//   const threadId = parseInt(req.params.id);
//   console.log(`Fetching thread with ID: ${threadId}`);
//   try {
//     const thread = await prisma.thread.findUnique({
//       where: { id: threadId },
//       include: {
//         author: true,
//         replies: {
//           include: {
//             like: true,
//           },
//         },
//       },
//     });

//     if (!thread) {
//       return res.status(404).json({ message: "Thread not found" });
//     }

//     res.status(200).json(thread);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching thread detail", error });
//   }
// }

