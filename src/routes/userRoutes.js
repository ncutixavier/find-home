import userControllers from '../controllers/userControllers'
import userValidation from '../validation/userValidation'
// import signinValidation from '../validation/signinValidation'
// import checkPassword from '../middlewares/checkIfPasswordExist'
import checkEmailExist from '../middleware/checkIfEmailExist'
import express from 'express'

const router = express.Router()

router.post(
    '/signup',
    userValidation.userValidate,
    checkEmailExist.emailExists,
    userControllers.signup
)
// router.post(
//     '/login', 
//     signinValidation.signinValidate,
//     // checkPassword.passwordExist,
//     userControllers.login
// )

router.
    route('/')
    .get(userControllers.getAllUsers)

router.
    route('/:id')
    .delete(userControllers.deleteUser)

export default router