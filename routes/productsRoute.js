const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const { getCoupons } = require("../controllers/couponController");
const {
  getItems,
  getSingleItem,
  placeOrder
} = require("../controllers/itemController");
router.get("/all", getItems);
router.get("/:id", getSingleItem);
router.use(requireAuth);
router.post("/placed", placeOrder);
router.get("/coupons", getCoupons);

module.exports = router;
