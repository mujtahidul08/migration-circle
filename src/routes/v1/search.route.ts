import express from 'express'
const searchRoute = express.Router()
import { PrismaClient } from '@prisma/client'
import { searchUser } from '../../controllers/search.controller'
const prisma = new PrismaClient()
import { authentication } from '../../middlewares/authentication';

searchRoute.get("/", authentication, searchUser)

export default searchRoute
