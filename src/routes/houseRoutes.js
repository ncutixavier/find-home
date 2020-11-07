import houseController from '../controllers/houseControllers'
import protectRoute from '../middleware/protectRoutes'
import checkExist from '../middleware/CheckExist'
import houseValidation from '../validation/houseValidation' 
import express from 'express'

const router = express.Router()

router
    .route('/')
    .get(
        protectRoute.protect,
        protectRoute.restrictTo('client', 'landlord', 'admin'),
        houseController.getProtectedHouses
    )
    .post(
        protectRoute.protect,
        protectRoute.restrictTo('landlord', 'admin'),
        houseValidation.houseValidate,
        houseController.addNewHouse
    )

router.get('/view', houseController.getAllHouses)

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

export default router