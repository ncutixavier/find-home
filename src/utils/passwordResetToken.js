import crypto from 'crypto'
import Model from '../database/models'

exports.createPasswordResetToken = async (email) => {
    const resetToken = crypto.randomBytes(32).toString('hex')

    let passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({ resetToken }, { passwordResetToken })
    let passwordResetExpires = Date.now() + 10 * 60 * 1000

    await Model.User.update(
        { passwordResetToken, passwordResetExpires },
        {
            where: { email }
        }
    );

    return resetToken
}