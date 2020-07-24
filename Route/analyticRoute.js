const express = require('express')
const router = express.Router()

const analyticController = require('../Controller/analyticController')
const authController = require('../Controller/authController')

router.get('/weekRevenue',authController.Authorization,analyticController.getWeekRevenue)
router.get('/revenueByMonth',analyticController.getRevenueByMonth)



module.exports = router