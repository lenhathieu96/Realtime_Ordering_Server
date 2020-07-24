const jwt = require('jsonwebtoken')
const secretKey = require('../Key')
const User = require('../Models/userModel')

module.exports.createToken = (userID) => {
    const token = jwt.sign(
        {
            userID
        },
        secretKey.Key,
        {
            expiresIn:'5m'
        }
    )
    return token;
}

module.exports.createRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        {
            userID: user._id
        },
        secretKey.refreshKey + user.password,
        {
            expiresIn:'10d'
        }
    )
    return refreshToken;
}