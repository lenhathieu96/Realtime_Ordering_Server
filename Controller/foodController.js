const Food = require('../Models/foodModel')

module.exports.getAllFood = (req,res)=>{
    Food.find({},(err,food)=>{
        if(err){
            console.log(err)
            res.status(400).json({err})
        }
        res.status(200).json(food)
    })
}

module.exports.addNewFood = (req,res)=>{
    if(req.body.name!==""&& req.body.price!==""){
        req.body.enable = true
        let newFood = new Food(req.body)
        Food.find({},(err,foodlist)=>{
            const duplicateFood =  foodlist.find(item=>item.name === newFood.name)
            if(!duplicateFood){
               newFood.save()
                .then(()=>{
                    res.status(200).json({status:200})
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).send("Lỗi Thêm Món")
                })
            }else{
                res.status(400).send("Món Đã Tồn Tại")
            }
        })
    }else{
        res.status(400).send("Lỗi Thêm Món")
    }
}

module.exports.updateFood = async  (req,res)=>{
   const food =  await Food.findOne({_id:req.body.id})
    if(food){
        food.name = req.body.food.name;
        food.price = req.body.food.price;
        food.save()
        .then(()=>{res.status(200).json({status:200})})
        .catch((err)=>{
            console.log(err)
            res.status(400).send("Lỗi Sửa Món")
        })
    }
}

module.exports.deleteFood = async (req,res)=>{
    Food.findOneAndRemove(req.body.id)
    .then(()=>{res.status(200).json({status:200})})
    .catch((err)=>{
        console.log(err)
        res.status(400).send("Lỗi Xoá Món")
    })
 }
