import Model from '../database/models/'
import passGener from '../utils/generatePassword'
import emails from '../utils/email'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import localStorage from 'localStorage'
import passwordResetToken from '../utils/passwordResetToken'
import messages from '../utils/messageMocks'
import crypto from 'crypto'

const signinToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN
    })
}

class userController {
    //create new user
    static async signup(req, res) {
        const { name, email, phone, birthdate, gender, role } = req.body
        const generatedPassword = passGener.generatePassword()
        let hashedPwd = await bcrypt.hash(generatedPassword, 12)
        try {
            const user = await Model.User.create({
                name,
                email,
                phone,
                birthdate,
                role,
                gender,
                password: hashedPwd
            })
            const Options = {
                email: user.email,
                subject: "Find-Home Registration Successfully",
                message: messages.signUpMessage(user.email, generatedPassword, user.role)
            }
            emails.sendEmail(Options)
            // const token = signinToken(user.id)
            res.status(200).json({
                message: res.__("register successfully"),
                user
            })
        } catch (error) {
            res.status(500).json({
                message: "error occurred while sending email"
            })
        }
    }

    static async login(req, res, next) {
        try {
            const token = signinToken(req.user.id)
            localStorage.setItem('token', token)
            res.status(200).json({
                token
            })
            next()
        } catch (error) {
            console.log('error')
        }
    }

    //get all users
    static async getAllUsers(req, res) {
        const users = await Model.User.findAll({
            attributes: { exclude: ['password', 'passwordResetToken', 'passwordResetExpires'] }
        })
        res.status(200).json({ users })
    }

    //delete user
    static async deleteUser(req, res) {
        try {
            const userId = req.params.id
            await Model.User.destroy({ where: { id: userId } });
            res.status(200).send({
                message: res.__("user deleted")
            });
        } catch (error) {
            console.log(error)
        }
    }


    static async logout(req, res) {
        localStorage.removeItem('token')
        res.status(200).json({
            message: res.__("logout done")
        })
    }

    static async forgotPassword(req, res) {
        const resetToken = await passwordResetToken.createPasswordResetToken(req.body.email)
        console.log(resetToken)

        //2. create reset url
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

        const Options = {
            email: req.body.email,
            subject: "Find-Home Reset Password (valid in 10 min)",
            message: messages.resetPasswordMessage(resetUrl)
        }
        //3. Send reset url link to user
        emails.sendEmail(Options)
        res.status(200).json({
            message: res.__("password reset link")
        })

    }

    static async resetPassword(req, res) {
        //1. get user by token
        let hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
        const user = await Model.User.findOne({
            where: {
                passwordResetToken: hashedToken
            }
        })

        if (!user) {
            res.status(400).json({
                message: res.__("invalid token")
            })
            return false
        }

        if (req.body.password !== req.body.passwordConfirm) {
            res.status(400).json({
                message: res.__("password not correct")
            })
            return false
        }
        const updateUserInfo = {
            password: await bcrypt.hash(req.body.password, 12),
            passwordResetToken: null,
            passwordResetExpires: null
        }

        const updated = await Model.User.update(updateUserInfo, { where: { email: user.email } });
        if (updated) {
            const userUpdated = await Model.User.findOne({ where: { email: user.email } })

            const token = signinToken(user.id)
            res.status(200).json({
                token,
                userUpdated
            })
        }

    }

    static async updateProfile(req, res) {
        const updated = await Model.User.update(req.body, { where: { email: req.user.email } });
        if (updated) {
            const updatedUserInfo = await Model.User.findOne({
                where: { email: req.user.email },
                attributes: { exclude: ['password', 'passwordResetToken', 'passwordResetExpires'] }
            })

            res.status(200).json({
                updatedUserInfo
            })
        }
    }
}

export default userController


