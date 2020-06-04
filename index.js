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

const SocketController = require('./SocketIO/Socket')(io)

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
