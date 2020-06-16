const Bill = require('../Models/billModel')

module.exports.getWeekRevenue = async (req,res) => {
    let today = new Date(Date.now()).getDate()
    let revenue = []
    await Bill.find({},(err,bill)=>{
        if(err){
            console.log(err)
            res.status(400).json({err})
        }
        for(let i = 0; i<7 ; i++){
            const filterbyDay = bill.filter(item=>new Date(item.Created).getDate()===today-i)
            const revenuebyDay = filterbyDay.reduce((revenue,eachBill)=>revenue+=eachBill.TotalPrice,0)
            revenue.push({
                day: i===0?"Hôm Nay":i===1?"Hôm Qua":"Ngày "+(today-i),
                revenue: revenuebyDay})
        }
        res.status(200).json(revenue)
    })
      
}

module.exports.getRevenueByMonth = (req,res) => {
    let month = new Date(Date.now()).getMonth()
    Bill.find({},(err,bill)=>{
        if(err){
            console.log(err)
            res.status(400).json({err})
        }
        const filterbyMonth = bill.filter(item=>new Date(item.Created).getMonth()=== month)
        const revenuebyMonth = filterbyMonth.reduce((revenue,eachBill)=>revenue+=eachBill.TotalPrice,0)
        res.send({revenue:revenuebyMonth})
    })
}