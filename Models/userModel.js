const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

var Users = mongoose.model("Users",userSchema,"Users")

module.exports = Users