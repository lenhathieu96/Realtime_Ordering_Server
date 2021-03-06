const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    done:{
        type:Number,
        required:true
    },
    served:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    note:{
        type:String,
    }

})

const billSchema = new mongoose.Schema({
    ID:{
        type:String,
        required:true
    },
    Created:{
        type:Date,
        require:true
    },  
    Table:{
        type:Number,
        required:true
    },
    Orders:[
        foodSchema
    ],
    TotalPrice:{
        type:Number,
        required:true
    },
    Payed:{
        type:Boolean,
        required:true
    }
})

const Bill = mongoose.model("Orders",billSchema,"Orders")

module.exports = Bill