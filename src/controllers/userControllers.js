import Model from '../database/models/'
import passGener from '../utils/generatePassword'
import emails from '../utils/email'
// import correctPasswords from '../utils/comparePassword'
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
        const token = signinToken(user.id)
        res.status(200).json({
            token,
            user
        })
        const Options ={
            email: user.email,
            password: generatedPassword
        }
        emails.sendEmail(Options)
    } catch (error) {
        res.json({
            message: res.__("can't post user")
        })
        // console.log(error.message)
    }
}

// exports.login = async (req, res, next) => {
//     const { email, password } = req.body

//     //check if email and password exist
//     const user = await Model.User.findOne({
//         where: { email }
//     });

//     console.log(user)

//     console.log(await correctPasswords.correctPassword(password, user.password))

//     if (!user || !(await correctPasswords.correctPassword(password, user.password))) {
//         return next(
//             res.status(401).json({
//                 message: res.__("incorrect email & pwd")
//             })
//         )
//     } else {
//         const token = signinToken(user.id)
//         res.status(200).json({
//             token
//         })
//     }
// }

//get all users
exports.getAllUsers = async (req, res) => {
    const users = await Model.User.findAll({
        attributes: ['id','name', 'email', 'phone', 'role', 'birthdate', 'gender']
    })
    res.status(200).json({ users })
}

//delete user
exports.deleteUser = async (req, res) => {
    try {
        const roleId = req.params.id
        const role = await Model.User.destroy({
            where: { id: roleId }
        });
        if (role) {
            res.status(200).send({
                message: 'Role deleted Successful'
            });
        }
    } catch (error) {
        res.status(404).json({
            message: 'can\'t delete user'
        })
    }
}