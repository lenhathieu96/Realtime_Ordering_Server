const express = require('express')
const router = express.Router()

const analyticController = require('../Controller/analyticController')
const authController = require('../Controller/authController')

router.get('/weeklyRevenue',authController.Authorization, analyticController.getWeeklyRevenue)
router.get('/monthlyRevenue',authController.Authorization, analyticController.getMonthlyRevenue)

module.exports = router