import userControllers from '../controllers/userControllers'
import express from 'express'

const router = express.Router()

router.
    route('/')
    .post(userControllers.createUser)
    .get(userControllers.getAllUsers)

// router.
//     route('/:id')
//     .get(userControllers.getUser)
    
export default router