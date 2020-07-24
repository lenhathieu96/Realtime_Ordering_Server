const express = require('express')
const router = express.Router()

const foodController = require('../Controller/foodController')
const authController = require('../Controller/authController')
router.get('/', foodController.getAllFood)
router.post('/addFood',foodController.addNewFood)
router.post('/updateFood',foodController.updateFood)
router.post('/deleteFood',foodController.deleteFood)


module.exports = router