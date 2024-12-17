import express from 'express'
const userRoute = express.Router()
import { PrismaClient } from '@prisma/client'
import { deleteUser,getAllUsers, updateUser } from '../../controllers/user.controller'
const prisma = new PrismaClient()

userRoute.get("/", getAllUsers)
userRoute.put("/:id", updateUser)
userRoute.delete("/:id", deleteUser)

export default userRoute
