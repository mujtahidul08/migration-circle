import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
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

export async function checkEmail(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate token untuk reset password
    const resetToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Kirim token ke frontend (simulasikan pengiriman email di sini)
    return res.status(200).json({
      message: "Reset instructions sent",
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error checking email", error });
  }
}

export async function updatePasswordUser(req: Request, res: Response) {
  const { token } = req.query;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    const decoded = jwt.verify(token as string, SECRET_KEY) as { id: number };

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
}