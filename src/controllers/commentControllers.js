import Model from '../database/models'
import emails from '../utils/email'
import messages from '../utils/messageMocks'
const { Comment, User, House } = Model

class commentController {
    static async createComment(req, res) {
        try {
            const { houseId } = req.params
            const { comment } = req.body
            const userId = req.user.id
            const findHouse = await House.findOne({
                where: { id: houseId },
                include: {
                    model: User,
                    as: 'landlord'
                }
            })
            const findClient = await User.findOne({ where: { id: req.user.id } })

            const newComment = await Comment.create({
                houseId, userId, comment
            })
            const Options = {
                email: findHouse.landlord.email,
                subject: "Find-Home Notification",
                message: messages.commentMessage(
                    findClient.name, findHouse.location, findClient.phone, findClient.email
                )
            }
            emails.sendEmail(Options)
            return res.json({ newComment })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: res.__("can't add new comment") })
        }
    }

    static async getComments(req, res) {
        try {
            const { houseId } = req.params
            const comments = await Comment.findAll({
                where: { houseId },
                include: {
                    model: User,
                    as: 'client',
                    attributes: ['name', 'email', 'phone']
                }
            })
            return res.json({ comments })

        } catch (error) {
            return res.json({ message: res.__("can't found comments") })
        }
    }

    static async getHouseCommented(req, res) {
        const houses = await Comment.findAll({
            where: { userId: req.user.id },
            include: {
                model: House,
                as: 'Houses'
            },
            attributes: ['userId', 'comment']
        })
        return res.json({ houses })
    }
}

export default commentController
