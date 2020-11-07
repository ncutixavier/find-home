import Model from '../database/models'
const { User, House } = Model

exports.checkHouseId = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const houses = await House.findAll()
    const IDs = houses.map(house => house.id)
    if (!IDs.includes(id)) {
        return res.status(404).json({
            message: res.__('house not found')
        })
    }
    next()
}

exports.CheckId = async (req, res, next,) => {
    const id = req.params.id
    if (isNaN(id)) {
        return res.status(500).json({
            message: res.__('id must be a number')
        })
    }
    const userId = await User.findOne({
        where: { id }
    })

    if (userId == null) {
        return res.status(404).json({
            message: res.__('id not found')
        })
    }
    next()
}

exports.checkEmailExist = async (req, res, next) => {
    //1. Check user email
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
        res.status(404).json({
            message: res.__("user not found")
        })
        return false
    }
    next()
}

exports.checkIdMatch = async (req, res, next) => {
    const { id } = req.params
    const house = await House.findOne({ where: { id } })
    if ((house.userId != req.user.id) && (req.user.role != 'admin')) {
        return res.status(401).json({
            message: res.__("not house owner")
        })
    }
    next()
}
