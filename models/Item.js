const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});
const Item = model("Item", ItemSchema);

module.exports = Item;
