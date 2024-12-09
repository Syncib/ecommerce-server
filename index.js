const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const productsRoute = require("./routes/productsRoute");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productsRoute);
mongoose
  .connect(
    "mongodb+srv://saqib:saqib12@cluster0.kuoxsy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(`failed to connect to database ${error.message}`);
  });
module.exports = app;
