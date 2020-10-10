import Model from '../database/models/'
import passGener from '../utils/generatePassword'
import emails from '../utils/email'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//sign in token
const signinToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN
    })
}

//q!i4kAPs
//R&DiPAKV

//create new user
exports.signup = async (req, res) => {
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

exports.login = (req, res) => {
    try {
        const token = signinToken(req.user.id)
        res.status(200).json({
            token
        })
    } catch (error) {
        console.log('error')
    }
}



//get all users
exports.getAllUsers = async (req, res) => {
    const users = await Model.User.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'role', 'birthdate', 'gender']
    })
    res.status(200).json({ users })
}

//delete user
exports.deleteUser = async (req, res) => {
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