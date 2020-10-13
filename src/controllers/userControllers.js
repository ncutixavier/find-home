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

//fzZHoQ6n
//i0yRJ&6v

//create new user
exports.signup = async (req, res) => {
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

exports.login = (req, res, next) => {
    try {
        const token = signinToken(req.user.id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

        res.cookie('jwt', token, cookieOptions)
        res.status(200).json({
            token
        })
        next()
    } catch (error) {
        console.log('error')
    }
}

exports.protect = async (req, res, next) => {
    let token = req.cookies.jwt
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1] || token
    }

    if (!token) {
        return next(
            res.status(401).json({
                message: res.__('log in to get access')
            })
        )

    }

    try {
        // 2. Verifying Token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        // 3. Check if user still exists
        const freshUser = await Model.User.findByPk(decoded.id)
        req.user = freshUser
        
        next()

    } catch (error) {
        let message
        if (error.name === 'TokenExpiredError') {
            message = res.__('Token expired')
        } else {
            message = res.__('login again')
        }
        return next(
            res.status(403).json({
                message: message
            })
        )
    }
}

//restrict to ...
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    message: res.__('permission for this action')
                })
            )
        }
        next()
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({
        message: res.__('logout done')
    })
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