import Model from '../database/models'

exports.emailExists = async (req, res, next) => {
    const emailExist = await Model.User.findOne({
        where: { email: req.body.email }
    });
    if (emailExist) {
        return res.status(409).json({ message: res.__('email exist') });
    }
    next()
}