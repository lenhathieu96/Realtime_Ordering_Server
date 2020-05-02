require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./Route/authRoute");

const orderController = require("./Controller/orderController");

const port = 3000;

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use("/", authRoute);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect database success"))
  .catch(() => console.log("Connect database fail"));

io.on("connect", (socket) => {
  console.log("user has connected");

  //Lấy toàn bộ order===========================================================================
  socket.on("data", () => {
    orderController
      .getOrder()
      .then((order) => {
        // console.log(order)
        socket.emit("dataResult", order);
      })
      .catch((err) => console.log(err));
  });

  //update 1 món đã làm xong===================================================================
  socket.on("singleDone", (bill_id, order_id) => {
    orderController
      .update_oneDone(bill_id, order_id)
      .then(() => {
        orderController
        .getOrder()
        .then((order) => {
          // console.log(order)
          socket.emit("dataResult", order);
          socket.broadcast.emit("dataResult",order)
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  
  //update tất cả món đã làm xong=================================================================
  socket.on("allDone", (bill_id, order_id) => {
    orderController
      .update_allDone(bill_id, order_id)
      .then(() => {
        orderController
        .getOrder()
        .then((order) => {
          // console.log(order)
          socket.emit("dataResult", order);
          socket.broadcast.emit("dataResult",order)
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  //Phục vụ 1 món ===============================================================================
  socket.on("singleFinish", (bill_id, order_id) => {
    orderController
      .update_singleFinish(bill_id, order_id)
      .then(() => {
        orderController
        .getOrder()
        .then((order) => {
          // console.log(order)
          socket.emit("dataResult", order);
          socket.broadcast.emit("dataResult",order)
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  //Phục vụ tất cả món==============================================================================
  socket.on("allFinish", (bill_id, order_id) => {
    orderController
      .update_allFinish(bill_id, order_id)
      .then(() => {
        orderController
        .getOrder()
        .then((order) => {
          // console.log(order)
          socket.emit("dataResult", order);
          socket.broadcast.emit("dataResult",order)
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
