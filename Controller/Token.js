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
            expiresIn:'1m'
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
            expiresIn:'1d'
        }
    )
    return refreshToken;
}

module.exports.refreshToken = (refreshToken) =>{
    let _userID;
    //get UserID from token
    try{
       const {userID} = jwt.decode(refreshToken)
       _userID = userID

    }catch(err){
        console.log(err)
    }
    //check valid of UserID
    if(!_userID){
        console.log('loi')
    }

    //Check user on database
    User.findOne({_id:_userID},(err,user)=>{
        if(err){
            console.log(err)
        }
        let refreshKey = secretKey.refreshKey + user.password
        jwt.verify(refreshToken, refreshKey,(err,payload)=>{
            if(err){
                console.log('Wrong Token')
            }
            const newToken = this.createToken(user)
            console.log(newToken, 'new refreshToken')
        })
    })
}