import houseController from '../controllers/houseControllers'
import protectRoute from '../middleware/protectRoutes'
import checkExist from '../middleware/CheckExist'
import houseValidation from '../validation/houseValidation'
import commentController from '../controllers/commentControllers'
import express from 'express'

const router = express.Router()

router
    .route('/')
    .get(
        protectRoute.protect,
        protectRoute.restrictTo('client', 'landlord', 'admin'),
        houseController.getAllHouses
    )
    .post(
        protectRoute.protect,
        protectRoute.restrictTo('landlord', 'admin'),
        houseValidation.houseValidate,
        houseController.addNewHouse
    )

// router.get(
//     '/view',
//     protectRoute.protect,
//     protectRoute.restrictTo('client','landlord', 'admin'),
//     houseController.getAllHouses
// )

router.get(
    '/getHouseCommented',
    protectRoute.protect,
    protectRoute.restrictTo('client', 'admin'),
    commentController.getHouseCommented
)

router
    .route('/:id')
    .get(
        protectRoute.protect,
        protectRoute.restrictTo('client', 'landlord', 'admin'),
        checkExist.checkHouseId,
        houseController.getHouse
    )
    .patch(
        protectRoute.protect,
        protectRoute.restrictTo('landlord', 'admin'),
        houseValidation.houseValidate,
        checkExist.checkHouseId,
        checkExist.checkIdMatch,
        houseController.updateHouse
    )
    .delete(
        protectRoute.protect,
        protectRoute.restrictTo('landlord', 'admin'),
        checkExist.checkHouseId,
        checkExist.checkIdMatch,
        houseController.deleteHouse
)

router.post(
    '/:houseId/createComment',
    protectRoute.protect,
    protectRoute.restrictTo('client', 'admin'),
    commentController.createComment
)

router.get(
    '/:houseId/getComments',
    protectRoute.protect,
    protectRoute.restrictTo('landlord', 'admin'),
    commentController.getComments
)

export default router