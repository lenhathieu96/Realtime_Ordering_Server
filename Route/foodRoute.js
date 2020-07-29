const express = require('express')
const router = express.Router()

const foodController = require('../Controller/foodController')
const authController = require('../Controller/authController')
router.get('/', authController.Authorization, foodController.getAllFood)
router.post('/addFood',authController.Authorization,foodController.addNewFood)
router.post('/updateFood',authController.Authorization,foodController.updateFood)
router.post('/deleteFood',authController.Authorization,foodController.deleteFood)


module.exports = router