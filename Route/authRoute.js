const express = require('express')
const router = express.Router()

const authController = require('../Controller/authController')

router.post('/',authController.Login)

module.exports = router