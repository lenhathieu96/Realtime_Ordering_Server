const jwt = require('jsonwebtoken')
const secretKey = require('../Key')

module.exports.checkJWT = (req, res, next)=>{
    try{
        const token = req.headers.authorization
        jwt.verify(token,secretKey.Key,(err, payload)=>{
            if(err){
                console.log(err,"loi jwt")
            }
        })
    }catch(error){
        console.log(error)
    }
}