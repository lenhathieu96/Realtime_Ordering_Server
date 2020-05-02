const Order = require("../Models/orderModel");

//Lấy toàn bộ Order===============================================================================
module.exports.getOrder = () =>
  new Promise((resolve, reject) => {
    Order.find({}, (err, order) => {
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
    Order.findOne({ ID: bill_id }, async (err, doc) => {
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
          done: doc.Detail[index].done + 1,
          quantity: doc.Detail[index].quantity - 1,
        };
        doc.markModified("Detail");
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
    Order.findOne({ ID: bill_id }, async (err, doc) => {
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
    Order.findOne({ ID: bill_id }, async (err, doc) => {
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
    Order.findOne({ ID: bill_id }, async (err, doc) => {
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
