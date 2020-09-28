import express from 'express'
import welcomeController from '../controllers/welcomeController'

const router = express.Router()

router.get('/', welcomeController.getWelcome)

export default router