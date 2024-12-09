const Coupon = require("../models/Coupon");

// Add a new coupon
const addCoupon = async (req, res) => {
  const { code, discount } = req.body;

  if (!code || !discount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists." });
    }

    const coupon = new Coupon({ code, discount });
    await coupon.save();
    res.status(201).json({ message: "Coupon added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding coupon." });
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
