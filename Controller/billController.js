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
      const Orders = doc.Orders
      const index = Orders.findIndex((order) => order._id == order_id);
      //check exists of order
      if (index >= 0) {
        let order = Orders[index]
        order.done < order.quantity ? order.done +=1 : order.done = order.quantity 
        doc.markModified("Orders");
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
      const Orders = doc.Orders
      const index = doc.Orders.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        Orders[index].done += Orders[index].quantity 
        doc.markModified("Orders");
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
    Bill.findOne({ ID: bill_id }, async (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      const Orders = doc.Orders
      const index = doc.Orders.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        let order = Orders[index]
        //'served' is not higher than 'quantity' 
        order.served < order.done ? order.served +=1 : order.served = order.done
        doc.markModified("Orders");
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
    Bill.findOne({ ID: bill_id }, (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      //   console.log(doc._id, "doc");
      const Orders = doc.Orders
      const index = doc.Orders.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        Orders[index].served += Orders[index].done
        doc.markModified("Orders");
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

  module.exports.updateBill = (bill_id,updated_orders)=>
    new Promise((resolve,reject)=>{
  // console.log(updated_orders);
      Bill.findOne({ ID: bill_id},(err,doc)=>{
        if(err){
          reject(err)
        }
        if(!doc){
          reject('Not Found')
        }
        doc.Orders=updated_orders;
        doc.save().then(()=>resolve())
        .catch((err)=>reject(err))
      })
    })

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

  module.exports.deleteBill = (bill_id) =>
  new Promise((resolve, reject) => {
    // console.log(bill_id);
    Bill.findByIdAndRemove(bill_id)
      .then(()=>resolve())
      .catch((err)=>reject(err))
  })

  module.exports.switchTable = (bill_id,chosenTable)=>
    new Promise((resolve,reject)=>{
  // console.log(updated_orders);
      Bill.findOne({ ID: bill_id},(err,doc)=>{
        if(err){
          reject(err)
        }
        if(!doc){
          reject('Not Found')
        }
        doc.Table=chosenTable;
        doc.save().then(()=>resolve())
        .catch((err)=>reject(err))
      })
    })

