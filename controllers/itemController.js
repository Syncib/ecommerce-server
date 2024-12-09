const { default: mongoose } = require("mongoose");
const Item = require("../models/Item");
const Order = require("../models/Order");
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

const getSingleItem = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item" });
  }
};

const viewOrders = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};


const addItem = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  try {
    const newItem = await Item.create({
      ...req.body,
      image: req.file.path,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item" });
  }
};

const placeOrder = async (req, res) => {
  const { items, total } = req.body;

  if (!items || items.length === 0 || !total) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    const newOrder = new Order({ items, total });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

module.exports = {
  addItem,
  getItems,
  getSingleItem,
  placeOrder,
  viewOrders,
};
