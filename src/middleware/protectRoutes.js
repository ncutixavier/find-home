import Model from '../database/models/'
import jwt from 'jsonwebtoken'
import localStorage from 'localStorage'

exports.protect = async (req, res, next) => {
    let token = localStorage.getItem('token')
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
        return next(
            res.status(403).json({
                message: res.__('login again')
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