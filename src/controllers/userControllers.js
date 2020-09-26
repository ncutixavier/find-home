import model from '../database/models/'

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await model.User.findAll({})
        res.status(200).send({
            status: 'success',
            users
        })
    } catch (error) {
        res.status(404).send({
            status: 'fail',
            message: error
        })
    }
}