const jwt = require('jsonwebtoken')

const User = require("../Models/userModel");
const secretKey = require('../Key')
const {createToken, createRefreshToken} = require('./Token')

module.exports.Login = (req, res, next) => {
    const params = req.body.params
    User.findOne({ name: params.username }, async (err, user) => {
      if (err) throw new err();
      if (!user) {
        return res
          .status(400)
          .send("User Not Found");
      }
      if(user.password!==params.password){
        return res
        .status(400)
        .send( "authenthication failed !, wrong password" );
      }else{
        const accessToken = createToken(user._id)
        const refreshToken = createRefreshToken(user)

        return res
        .status(200)
        .json({ message: "authenthication sucess", data:{
          accessToken,refreshToken
        } });
      }
    });
};

module.exports.Authorization = (req, res, next)=>{
  const bearerToken = req.headers.authorization
  if(bearerToken.startsWith('Bearer ')){
    let token = bearerToken.slice(7, bearerToken.length).trimLeft();
    jwt.verify(token,secretKey.Key,(err,payload)=>{
      if(err){
        return res.status(401).send('Invalid Token')
      }else{
        next()
      }
    })
  }
}

module.exports.refreshToken = (req,res)=>{
  // console.log(req.body.refreshToken)
  const refreshToken = req.body.refreshToken
    //get UserID from token
    try{
      let _userID = jwt.decode(refreshToken)
      if(!_userID){
        res.status(401).send('invalid token')
     }else{
       User.findOne({_id:_userID.userID},(err,user)=>{
         if(err){
          res.status(401).send('user not found')
         }
         let refreshKey = secretKey.refreshKey + user.password
         jwt.verify(refreshToken, refreshKey,(err,payload)=>{
             if(err){
              res.status(401).send('invalid token')
             }else{
               const New_AccessToken = createToken(user)
               res.status(200).json({accessToken: New_AccessToken})
             }    
         })
     })
     }
    }catch(err){
        res.status(401).send()
    }
    //check valid of UserID
   
    //Check user on database
    
    
}