const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

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
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order