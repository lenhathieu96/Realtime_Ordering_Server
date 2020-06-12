const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    enable:{
        type:Boolean,
        required:true
    }
})

const Food = mongoose.model("Food",foodSchema,"Food")

module.exports = Food
