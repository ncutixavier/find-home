import userControllers from '../controllers/userControllers'
import userValidation from '../validation/userValidation'
import signinValidation from '../validation/signinValidation'
import checkUserCredentials from '../middleware/CheckUserCredentials'
import checkEmailExist from '../middleware/checkIfEmailExist'
import checkIdExist from '../middleware/CheckIfIdExist'
import express from 'express'

const router = express.Router()

router.post(
    '/signup',
    userValidation.userValidate,
    checkEmailExist.emailExists,
    userControllers.signup
)
router.post(
    '/login',
    signinValidation.signInValidate,
    checkUserCredentials.checkEmailAndPassword,
    userControllers.login
)

router.get(
    '/logout',
    userControllers.protect,
    userControllers.logout
)

router.
    route('/')
    .get(
        userControllers.protect,
        userControllers.restrictTo('admin'),
        userControllers.getAllUsers
    )

router.
    route('/:id')
    .delete(
        checkIdExist.CheckId,
        userControllers.deleteUser
    )

export default router