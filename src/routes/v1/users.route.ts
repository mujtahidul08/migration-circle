import express from 'express'
const userRoute = express.Router()
import { PrismaClient } from '@prisma/client'
import { checkEmail, deleteUser,getAllUsers, updatePasswordUser, updateUser } from '../../controllers/user.controller'
const prisma = new PrismaClient()

userRoute.get("/", getAllUsers)
userRoute.get("/forgot", checkEmail)
userRoute.put("/reset", updatePasswordUser)
userRoute.delete("/:id", deleteUser)


export default userRoute
