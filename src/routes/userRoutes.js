import userController from '../controllers/userControllers'
import userValidation from '../validation/userValidation'
import signinValidation from '../validation/signinValidation'
import checkUserCredentials from '../middleware/CheckUserCredentials'
import checkEmailExist from '../middleware/checkIfEmailExist'
import checkIdExist from '../middleware/CheckIfIdExist'
import protectRoutes from '../middleware/protectRoutes'
import express from 'express'

const router = express.Router()

router.post(
    '/signup',
    userValidation.userValidate,
    checkEmailExist.emailExists,
    userController.signup
)
router.post(
    '/login',
    signinValidation.signInValidate,
    checkUserCredentials.checkEmailAndPassword,
    userController.login
)

router.get(
    '/logout',
    protectRoutes.protect,
    userController.logout
)

router.
    route('/')
    .get(
        protectRoutes.protect,
        protectRoutes.restrictTo('admin'),
        userController.getAllUsers
    )

router.
    route('/:id')
    .delete(
        checkIdExist.CheckId,
        userController.deleteUser
    )

export default router