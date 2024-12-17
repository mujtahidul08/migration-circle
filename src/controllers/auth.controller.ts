import express, { Request, Response } from 'express'
const authRoute = express.Router()
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY ||"wakwakwakwak123"

export async function register(req: Request,res:Response){
    const {username, email, password, fullname} = req.body

    if (!username||!password||!email){
        res.status(400).json({message:"all fields are required"})
    }

    try{
        const existingUser = await prisma.user.findFirst({
            where:{
                OR:[{username},{email}]
            }
        })
        if(existingUser){
            return res.status(400).json({message:"username or email already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password : hashedPassword
            }
        })
        res.status(201).json({message:"user registered", user:newUser})
    }

    catch(error){
        res.status(400).json({message:"all fields are required"})
    }

}

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
            res.status(400).json({message:"login succesfull", user:{
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
