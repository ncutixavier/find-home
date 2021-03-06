import userController from '../controllers/userControllers'
import userValidation from '../validation/userValidation'
import signinValidation from '../validation/signinValidation'
import checkUserCredentials from '../middleware/CheckUserCredentials'
import checkEmailExist from '../middleware/checkIfEmailExist'
import checkExist from '../middleware/CheckExist'
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

router.post(
    '/forgotPassword',
    checkExist.checkEmailExist,
    userController.forgotPassword
)

router.patch('/resetPassword/:token', userController.resetPassword)

router.patch(
    '/profile',
    userValidation.userUpdateValidate,
    protectRoutes.protect,
    userController.updateProfile
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
        protectRoutes.protect,
        protectRoutes.restrictTo('admin'),
        checkExist.CheckId,
        userController.deleteUser
    )

export default router