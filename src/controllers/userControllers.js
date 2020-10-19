import Model from '../database/models/'
import passGener from '../utils/generatePassword'
import emails from '../utils/email'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import localStorage from 'localStorage'

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
        console.log(generatedPassword)
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
                password: generatedPassword
            }
            emails.sendEmail(Options)
            const token = signinToken(user.id)
            res.status(200).json({
                token,
                user
            })
        } catch (error) {
            console.log(error.message)
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
            attributes: ['id', 'name', 'email', 'phone', 'role', 'birthdate', 'gender']
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
}

export default userController
//sign in token


//zmkYiZkW

//create new user


