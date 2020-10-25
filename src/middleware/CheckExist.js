import Model from '../database/models'

exports.CheckId = async (req, res, next) => {
    const id = req.params.id
    if(isNaN(id)){
        return next(
            res.status(500).json({
                message: res.__('id must be a number')
            })
        )
    }
    const userId = await Model.User.findOne({
        where: { id }
    })

    if(userId == null) {
        return next(
            res.status(404).json({
                message: res.__('id not found')
            })
        )
    }
    next()
}

exports.checkEmailExist = async (req, res, next) => {
    //1. Check user email
    const user = await Model.User.findOne({where: { email: req.body.email }})
    if (!user) {
        res.status(404).json({
            message: res.__("user not found")
        })
        return false
    }
    next()
}
