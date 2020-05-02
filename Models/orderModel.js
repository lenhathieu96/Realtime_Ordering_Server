const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    ID:{
        type:String,
        required:true
    },
    Table:{
        type:String,
        required:true
    },
    Detail:{
        type:Array,
        require:true
    },
    Price:{
        type:Number,
        required:true
    }
})

const Order = mongoose.model("Orders",orderSchema,"Orders")
module.exports = Order