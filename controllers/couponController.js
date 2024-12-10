const Coupon = require("../models/Coupon");

// Add a new coupon
const addCoupon = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  const { code, discount, expiry } = req.body;

  // Validate input
  if (!code || !discount || !expiry) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists." });
    }

    // Create a new coupon
    const newCoupon = new Coupon({
      code,
      discount,
      expiry,
    });

    await newCoupon.save();
    res.status(201).json({ message: "Coupon added successfully." });
  } catch (error) {
    console.error("Error adding coupon:", error);
    res.status(500).json({ message: "Failed to add coupon." });
  }
};

// Get all coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching coupons." });
  }
};

const viewCoupons = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  try {
    const coupons = await Coupon.find(); // Sort by expiry date
    res.status(200).json({ coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ message: "Failed to fetch coupons." });
  }
};

module.exports = { getCoupons, addCoupon, viewCoupons };
