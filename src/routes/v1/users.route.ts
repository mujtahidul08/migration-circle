import express, { Request, Response } from 'express'
const userRoute = express.Router()
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { deleteUser, FollowUser, getAllUsers, updateUser } from '../../controllers/user.controller'
import { authentication } from '../../middlewares/authentication'
const prisma = new PrismaClient()


userRoute.get("/", getAllUsers)
userRoute.put("/:id", updateUser)
userRoute.delete("/:id", deleteUser)
userRoute.post("/follow/:id",authentication, FollowUser)



export default userRoute
