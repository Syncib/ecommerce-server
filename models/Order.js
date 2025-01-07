const mongoose = require("mongoose");

// Define the order schema
const orderSchema = new mongoose.Schema({
  items: [
    {
      id: String,
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now },
  address: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
