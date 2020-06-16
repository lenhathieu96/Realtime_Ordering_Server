const express = require('express')
const router = express.Router()

const analyticController = require('../Controller/analyticController')

router.get('/weekRevenue',analyticController.getWeekRevenue)
router.get('/revenueByMonth',analyticController.getRevenueByMonth)



module.exports = router