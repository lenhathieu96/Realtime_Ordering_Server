const Food = require('../Models/foodModel')

module.exports.getAllFood = (req,res)=>{
    Food.find({},(err,food)=>{
        if(err){
            console.log(err)
            res.status(400)
        }
        res.status(200).json(food)
    })
}

module.exports.addNewFood = (req,res)=>{
    let food = new Food(req.body)
    food.save().then(()=>res.status(200))
    .catch((err)=>{
        console.log(err)
        res.status(400)
    })
}

module.exports.updateFood = async (req,res)=>{
   const food =  await Food.findOne({_id:req.body.id})
    if(food){
        food.name = req.body.food.name;
        food.price = req.body.food.price;
        food.save()
        .then(()=>{res.status(200)})
        .catch((err)=>{
            console.log(err)
            res.status(400)
        })
    }
}