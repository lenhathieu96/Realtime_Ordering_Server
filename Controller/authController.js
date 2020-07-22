const jwt = require('jsonwebtoken')

const User = require("../Models/userModel");
const secretKey = require('../Key')
const {createToken, createRefreshToken} = require('./Token')

module.exports.Login = (req, res) => {
  console.log(req.body);
  const params = req.body.params
  try {
    User.findOne({ name: params.username }, async (err, user) => {
      if (err) throw new err();
      if (!user) {
        return res
          .status(400)
          .json({ message: "authenthication failed !, user not found" });
      }
      if(user.password!==params.password){
        return res
        .status(400)
        .json({ message: "authenthication failed !, wrong password" });
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
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ message: "authenthication failed !, something wrong" });
  }
};

module.exports.Authorization = (req, res, next)=>{
  const accessToken = req.headers['x-access-token']
  jwt.verify(accessToken,secretKey.Key,(err,payload)=>{ 
    //Wrong token or invalid token
    if(err){
      
    }
    next()
  })
}