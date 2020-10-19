import correctPassword from '../utils/comparePassword'
import Model from '../database/models'

exports.checkEmailAndPassword = async (req, res, next) => {
    const { email, password } = req.body

    const user = await Model.User.findOne({
        where: { email }
    });

    if (!user) {
        return next(
            res.status(404).json({
                message: res.__("incorrect email")
            })
        )
    }

    if (!await correctPassword.correctPassword(password, user.password)) {
        res.status(404).json({
            message: res.__("incorrect pwd")
        })
    }
    req.user = user
    next()
}