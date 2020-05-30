const Bill = require("../Models/billModel");

//Lấy toàn bộ Order===============================================================================
module.exports.getAllBill = () =>
  new Promise((resolve, reject) => {
    Bill.find({Payed:false}, (err, order) => {
      if (err) {
        reject(err);
      }
      resolve(order);
    });
  });

//Thực hiện xong 1 món============================================================================
module.exports.update_oneDone = (bill_id, order_id) =>
  new Promise((resolve, reject) => {
    //Kiếm _id theo bill ID
    Bill.findOne({ ID: bill_id }, (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      const Orders = doc.Order
      const index = Orders.findIndex((order) => order._id == order_id);
      if (index >= 0) {
        Orders[index].done +=1 
        doc.markModified("Order");
        doc
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
      // console.log(Orders[index])

      }
    });
  });

//Thực hiện xong tất cả món ========================================================================
module.exports.update_allDone = (bill_id, order_id) =>
  new Promise((resolve, reject) => {
    // console.log(order_id,"order_id")
    Bill.findOne({ ID: bill_id }, async (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      //   console.log(doc._id, "doc");
      const Orders = doc.Order
      const index = doc.Order.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        Orders[index].done += Orders[index].quantity 
        // doc.Order[index] = {
        //   ...doc.Order[index],
        //   done: doc.Order[index].quantity + doc.Order[index].done,
        //   quantity: 0,
        // };
        doc.markModified("Order");
        doc
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
      }
    });
  });

//Phục vụ 1 món====================================================================================
module.exports.update_oneServed = (bill_id, order_id) =>
  new Promise((resolve, reject) => {
    // console.log(order_id,"order_id")
    Bill.findOne({ ID: bill_id }, async (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      //   console.log(doc._id, "doc");
      const Orders = doc.Order
      const index = doc.Order.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        Orders[index].done-=1 
        Orders[index].served +=1
        doc.markModified("Order");
        doc
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
      }
    });
  });

//Phục vụ tất cả món===================================================================================
module.exports.update_allServed = (bill_id, order_id) =>
  new Promise((resolve, reject) => {

    // console.log(order_id,"order_id")
    Bill.findOne({ ID: bill_id }, (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      //   console.log(doc._id, "doc");
      const Orders = doc.Order
      const index = doc.Order.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        Orders[index].served += Orders[index].done
        Orders[index].done = 0 

        doc.markModified("Order");
        doc
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
      }
    });
  });

module.exports.createBill = (bill) =>
  new Promise((resolve, reject) => {
    let newBill = new Bill(bill);
    newBill.save()
      .then(() => resolve())
      .catch((err) => reject(err));
  });

  module.exports.chargeBill = (bill_id) =>
  new Promise((resolve, reject) => {
    Bill.findOne({ ID: bill_id }, (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      doc.Payed = true;
      doc.save().then(()=>resolve()).catch((err)=>reject(err))
    })
  })

