const express = require('express')
const router = express.Router()

const foodController = require('../Controller/foodController')

router.get('/',foodController.getAllFood)
router.post('/addFood',foodController.addNewFood)
router.post('/updateFood',foodController.updateFood)


module.exports = router