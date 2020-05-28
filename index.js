require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./Route/authRoute");
const foodRoute = require("./Route/foodRoute");

const billController = require("./Controller/billController");

const port = 8000;
const createUID = ()=>Date.now()


app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use("/", authRoute);
app.use("/food",foodRoute)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect database success"))
  .catch((err) => console.log("Connect database fail",err));

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
  socket.on("singleDone", (bill_id, order_id) => {
    billController
      .update_oneDone(bill_id, order_id)
      .then(() => {
        billController
        .getOrder()
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
        .getOrder()
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
  socket.on("singleFinish", (bill_id, order_id) => {
    billController
      .update_singleFinish(bill_id, order_id)
      .then(() => {
        billController
        .getOrder()
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
  socket.on("allFinish", (bill_id, order_id) => {
    billController
      .update_allFinish(bill_id, order_id)
      .then(() => {
        billController
        .getOrder()
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
    // console.log(bill)
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

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
