const billController = require("../Controller/billController");

const createUID = ()=>Date.now()
module.exports = function(io){
    io.on("connect", (socket) => {
        console.log("user has connected");
      
        //Lấy toàn bộ order===========================================================================
        socket.on("allBill", () => {
          billController
            .getAllBill()
            .then((order) => {
              // console.log(order)
              socket.emit("allBillResult", order);
            })
            .catch((err) => console.log(err));
        });
      
        //update 1 món đã làm xong===================================================================
        socket.on("oneDone", (bill_id, order_id) => {
          billController
            .update_oneDone(bill_id, order_id)
            .then(() => {
              billController
              .getAllBill()
              .then((order) => {
                console.log(order)
                socket.emit("allBillResult", order);
                socket.broadcast.emit("allBillResult",order)
              })
              .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        });
        
        //update tất cả món đã làm xong=================================================================
        socket.on("allDone", (bill_id, order_id) => {
          billController
            .update_allDone(bill_id, order_id)
            .then(() => {
              billController
              .getAllBill()
              .then((order) => {
                // console.log(order)
                socket.emit("allBillResult", order);
                socket.broadcast.emit("allBillResult",order)
              })
              .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        });
      
        //Phục vụ 1 món ===============================================================================
        socket.on("oneServed", (bill_id, order_id) => {
          billController
            .update_oneServed(bill_id, order_id)
            .then(() => {
              billController
              .getAllBill()
              .then((order) => {
                // console.log(order)
                socket.emit("allBillResult", order);
                socket.broadcast.emit("allBillResult",order)
              })
              .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        });
      
        //Phục vụ tất cả món==============================================================================
        socket.on("allServed", (bill_id, order_id) => {
          billController
            .update_allServed(bill_id, order_id)
            .then(() => {
              billController
              .getAllBill()
              .then((order) => {
                // console.log(order)
                socket.emit("allBillResult", order);
                socket.broadcast.emit("allBillResult",order)
              })
              .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        });
      
        socket.on("createBill",(bill)=>{
          bill.ID = "BI"+createUID()
          bill.Created = Date.now()
          bill.Payed = false
          billController.createBill(bill).then(()=>{
            billController.getAllBill().then((allBill)=>{
              socket.emit('createBillResult',true)
              socket.emit("allBillResult",allBill)
              socket.broadcast.emit("allBillResult",allBill)
            })
          })
          .catch((err)=>{
            console.log(err)
            socket.emit('createBillResult',false)
          })
        })

        socket.on('updateBill',(bill_id,updated_orders)=>{
          billController.updateBill(bill_id,updated_orders).then(()=>{
            billController.getAllBill().then((allBill)=>{
              socket.emit('updateBillResult',true)
              socket.emit("allBillResult",allBill)
              socket.broadcast.emit("allBillResult",allBill)
            })
          })
          .catch((err)=>{
            console.log(err)
            socket.emit('updateBillResult',false)
          })
        })
      
        socket.on('chargeBill',(billID)=>{
          billController.chargeBill(billID).then(()=>{
            billController.getAllBill().then((allBill)=>{
              socket.emit('chargeBillResult',true)
              socket.emit("allBillResult",allBill)
              socket.broadcast.emit("allBillResult",allBill)
            })
          })
          .catch((err)=>{
            console.log(err)
            socket.emit('createBillResult',false)
          })
        })
      });
} 
