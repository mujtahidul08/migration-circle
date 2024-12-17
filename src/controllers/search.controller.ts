import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function searchUser(req: Request, res: Response) {
  const userId = (req as any).user?.id; 
  const query = req.query.q as string; 
  // const page = parseInt((req.query.page as string) || '1'); 
  // const pageSize = parseInt((req.query.pageSize as string) || '10');

  if (!query) {
    return res.status(400).json({ message: 'Query parameter "q" is required for search' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } }, 
          {
            OR: [
              { username: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { fullname: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
      },
      // skip: (page - 1) * pageSize,
      // take: pageSize,
    });

    res.status(200).json({
      message: 'Search results fetched successfully',
      query,
      // page,
      // pageSize,
      results: users,
    });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Error searching users', error });
  }
}
