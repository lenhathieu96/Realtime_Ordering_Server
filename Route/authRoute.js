const express = require('express')
const router = express.Router()

const authController = require('../Controller/authController')

router.get('/',(req,res)=>{
    res.send('hello to my server')
})
router.post('/',authController.Login)

module.exports = router