import Model from '../database/models/'
// import catchError from '../utils/catchError'
// import AppError from '../utils/AppError'

//get all users
exports.getAllUsers = async(req, res) => {
    const users = await Model.User.findAll({})
    res.status(200).json({
        status: res.__('success'),
        users
    })
}

//get user by id
// exports.getUser = catchError(async (req, res, next) => {
//     const user = await model.User.findAll({
//         where: { id: req.params.id }
//     })

//     if (user.length === 0) {
//         return next(new AppError(`No user found with id = ${req.params.id}`, 404))
//     }

//     res.status(200).json({
//         status: 'success',
//         user
//     })
// })