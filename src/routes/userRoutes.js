import userControllers from '../controllers/userControllers'
import express from 'express'

const router = express.Router()

router.
    route('/')
    .get(userControllers.getAllUsers)

export default router