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
    let clientFood = req.body.params
    if(clientFood.name!==""&& clientFood.price!==""){
        clientFood.enable = true
        let newFood = new Food(clientFood)
        Food.find({},(err,foodlist)=>{
            const duplicateFood =  foodlist.find(item=>item.name === newFood.name)
            if(!duplicateFood){
               newFood.save()
                .then(()=>{
                    console.log('Thêm Thành Công')
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
    const clientFood = req.body.params
   const food =  await Food.findOne({_id:clientFood.id})
    if(food){
        food.name = clientFood.food.name;
        food.price = clientFood.food.price;
        food.save()
        .then(()=>{
            console.log('update thành công')
            res.status(200).json({status:200})
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).send("Lỗi Sửa Món")
        })
    }
}

module.exports.deleteFood = (req,res)=>{
    const clientFood = req.body.params
    console.log(clientFood)
    Food.findByIdAndDelete(clientFood)
    .then(()=>{
        console.log('xoá thành công')
        res.status(200).json({status:200})
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).send("Lỗi Xoá Món")
    })
 }
