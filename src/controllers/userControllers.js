import model from '../database/models/'

//get all users
exports.getAllUsers = async (req, res) => {
    const users = await model.User.findAll({})
    res.status(200).send({
        status: 'success',
        users
    })
}