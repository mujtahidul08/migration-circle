import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary';

const prisma = new PrismaClient();

export async function createThread(req: Request, res: Response) {
  const { content } = req.body;
  const authorId = (req as any).user.id;
  if (!content || !authorId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let imagePath: string | null = null;

  if (req.file) {
    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'circle-app', // Cloudinary folder for organization
      });

      // Get the URL of the uploaded image from Cloudinary
      imagePath = result.secure_url; // Store the URL in your database
      console.log('Uploaded file details:', req.file);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return res.status(500).json({ message: "Error uploading image", error });
    }
  }

  let data = {
    content,
    authorId: parseInt(authorId),
    image: imagePath,
  };
  console.log(data);
  try {
    const newThread = await prisma.thread.create({
      data,
    });

    res
      .status(201)
      .json({ message: "Thread created successfully", thread: newThread });
  } catch (error) {
    res.status(500).json({ message: "Error creating thread", error });
  }
}


// export async function createThread(req: Request, res: Response) {
//   const { content, fileUrl } = req.body;
//   const userId = (req as any).user?.id;

//   if (!content || !userId) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   let data = {
//     content,
//     authorId: parseInt(userId),
//     image: fileUrl || null, // Simpan URL file yang diunggah
//   };

//   try {
//     const newThread = await prisma.thread.create({
//       data,
//     });

//     res
//       .status(201)
//       .json({ message: 'Thread created successfully', thread: newThread });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating thread', error });
//   }
// }
// export async function createThread(req: Request, res: Response) {
//   const { content } = req.body;
//   const userId = (req as any).user?.id; 

//   if (!content || !userId) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   let imagePath: string | null = null;
//   const file = req.file;
//   if (req.file) {
//     console.log(req.file);
//     imagePath = req.file.filename;
//   }

//   let data = {
//     content,
//     authorId: parseInt(userId),
//     image: imagePath,
//   };

//   console.log('data :', data);

//   try {
//     const newThread = await prisma.thread.create({
//       data,
//     });

//     res
//       .status(201)
//       .json({ message: 'Thread created successfully', thread: newThread });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating thread', error });
//   }
// }

export async function getAllThreads(req: Request, res: Response) {
  try {    
    const allThreads = await prisma.thread.findMany({
      where: {
        isDeleted: 0,
      },
      orderBy: {
        createdAt: 'desc', // Urutkan berdasarkan createdAt descending
      },
      select: {
        id: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        content: true,
        image: true,
        like: true,
        replies: true,
        author: {
          select: {
            username: true,
            email: true,
            profile: true
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: 'Get all threads successful', threads: allThreads });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all threads', error });
  }
}

export async function getThreadById(req: Request, res: Response) {
  const threadId = parseInt(req.params.id);
  console.log(`Fetching thread with ID: ${threadId}`);
  try {
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        author: true,
        replies: {
          include: {
            like: true,
          },
        },
      },
    });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    res.status(200).json(thread);
  } catch (error) {
    res.status(500).json({ message: "Error fetching thread detail", error });
  }
}

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