import express, { Request, Response } from 'express'
const authRoute = express.Router()
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY ||"wakwakwakwak123"

export async function register(req: Request, res: Response) {
    const { username, email, password, fullname } = req.body;
  
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Periksa apakah username atau email sudah ada
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Buat user baru
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          // Jika diperlukan, tambahkan fullname di sini
          fullname: fullname || null,
        },
      });
  
      // Buat profil default untuk user
      const newProfile = await prisma.profile.create({
        data: {
          userId: newUser.id,  // Menghubungkan profil dengan user ID
          bio: "hi i'm using circle app",              // Nilai default untuk bio
          phoneNumber: "",    // Nilai default untuk phoneNumber
          avatarImage: "https://img.freepik.com/premium-vector/user-icon-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable_697711-1132.jpg",    // Nilai default untuk avatarImage
          backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabIxhM8NFoIQDqEpUVq68X0dLORJAajF_LA&s", // Nilai default untuk backgroundImage
        },
      });
  
      return res.status(201).json({ message: "User registered", user: newUser, profile: newProfile });
    } catch (error) {
      console.error("Registration failed:", error);
      return res.status(400).json({ message: "An error occurred during registration" });
    }
  }

// export async function register(req: Request,res:Response){
//     const {username, email, password, fullname} = req.body

//     if (!username||!password||!email){
//         return res.status(400).json({message:"all fields are required"})
//     }

//     try{
//         const existingUser = await prisma.user.findFirst({
//             where:{
//                 OR:[{username},{email}]
//             }
//         })
//         if(existingUser){
//             return res.status(400).json({message:"username or email already exist"})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)
//         const newUser = await prisma.user.create({
//             data:{
//                 username,
//                 email,
//                 password : hashedPassword
//             }
//         })
//         return res.status(201).json({message:"user registered", user:newUser})
//     }

//     catch(error){
//         return res.status(400).json({message:"all fields are required"})
//     }

// }

export async function login (req: Request,res:Response) {
    const {username,password} = req.body
    if(!username||!password){
        res.status(400).json({message:"all fields are required"})
    }
    try{
        const user = await prisma.user.findUnique({
            where:{username}
        })
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            console.log(SECRET_KEY)
            const token = jwt.sign(
                {
                    id:user.id,
                    username: user.username
                },
                SECRET_KEY,
                {expiresIn:"10h"}
            )
            res.status(200).json({message:"login succesfull", user:{
                username:user.username,
                email: user.email
            },
            token
        })
        } else{
            res.status(401).json({message:"unauthorized"})
        }
    }
    catch(error){
        res.status(500).json({message:"error login"})
    }
}
