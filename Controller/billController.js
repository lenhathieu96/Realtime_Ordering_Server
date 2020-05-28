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
    // console.log(order_id,"order_id")
    // console.log(bill_id)

    //Kiếm _id theo bill ID
    Bill.findOne({ ID: bill_id }, async (err, doc) => {
      if (err) {
        reject(err);
      }
      if (!doc) {
        reject("Not Found");
      }
      // console.log(typeof order_id);
      const index = doc.Detail.findIndex((order) => order._id == order_id);
      if (index >= 0) {
        doc.Detail[index] = {
          ...doc.Detail[index],
          done: doc.Detail[index].done + 1,
          quantity: doc.Detail[index].quantity - 1,
        };
        console.log(doc);
        doc
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
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
      const index = doc.Detail.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        doc.Detail[index] = {
          ...doc.Detail[index],
          done: doc.Detail[index].quantity + doc.Detail[index].done,
          quantity: 0,
        };
        doc.markModified("Detail");
        doc
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
      }
    });
  });

//Phục vụ 1 món====================================================================================
module.exports.update_singleFinish = (bill_id, order_id) =>
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
      const index = doc.Detail.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        doc.Detail[index] = {
          ...doc.Detail[index],
          done: doc.Detail[index].done - 1,
          served: doc.Detail[index].served + 1,
        };
        doc.markModified("Detail");
        doc
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
      }
    });
  });

//Phục vụ tất cả món===================================================================================
module.exports.update_allFinish = (bill_id, order_id) =>
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
      const index = doc.Detail.findIndex((order) => order.id === order_id);
      if (index >= 0) {
        doc.Detail[index] = {
          ...doc.Detail[index],
          served: doc.Detail[index].served + doc.Detail[index].done,
          done: 0,
        };
        doc.markModified("Detail");
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

