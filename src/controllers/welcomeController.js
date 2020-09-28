import catchError from '../utils/catchError'

exports.getWelcome = catchError(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'welcome to find home'
    })
})