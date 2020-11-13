import Model from '../database/models'
import { paginate } from 'paginate-info'
import paginater from '../utils/paginate'
const { House } = Model


class houseController {
    static async getAllHouses(req, res) {
        const houses = await House.findAll(
            { attributes: ['image', 'description'] }
        )
        res.status(200).json({ houses })
    }

    static async getProtectedHouses(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const { rows, count } = await House.findAndCountAll(
                req.user.role == 'landlord' ?
                    paginater.paginate(
                        { where: { userId: req.user.id } },
                        { page, limit },
                    ) : paginater.paginate(
                        { where: {} },
                        { page, limit },
                    )
            )
            if (rows.length == 0) {
                return res.status(404).json({
                    message: res.__('page not found')
                })
            }

            const pagination = paginate(page, count, rows, limit);

            return res.status(200).json({
                pagination,
                rows
            })
        } catch (error) {
            res.status(500).json({
                message: res.__("can't get houses")
            })
        }
    }

    static async addNewHouse(req, res) {
        try {
            const { image, description, location, bedrooms, bathrooms, price, status } = req.body
            const userId = req.user.id
            const house = await House.create({
                image, description, location, bedrooms, bathrooms, price, status, userId
            })
            res.status(201).json({
                house
            })
        } catch (error) {
            res.status(500).json({
                message: res.__("can't add house")
            })
        }
    }

    static async getHouse(req, res) {
        try {
            const house = await House.findOne({ where: { id: req.params.id } })
            return res.status(200).json({
                house
            })
        } catch (error) {
            res.status(500).json({
                message: res.__("Invalid id")
            })
        }
    }



    static async updateHouse(req, res) {
        try {
            const updated = await House.update(
                req.body,
                { where: { id: req.params.id } })

            if (updated) {
                const updatedHouse = await House.findOne({ where: { id: req.params.id } })
                return res.status(200).json({
                    updatedHouse
                })
            }
        } catch (error) {
            res.status(500).json({
                message: res.__("can't update house")
            })
        }
    }

    static async deleteHouse(req, res) {
        await House.destroy({ where: { id: req.params.id } })
        res.status(200).json({
            message: res.__("deleted successfully")
        })
    }
}

export default houseController
