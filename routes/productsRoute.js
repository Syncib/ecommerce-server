const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const { getCoupons } = require("../controllers/couponController");
const {
  getItems,
  getSingleItem,
  placeOrder,deleteSingleItem
} = require("../controllers/itemController");
router.get("/coupons", getCoupons);
router.get("/all", getItems);
router.get("/single/:id", getSingleItem);
router.delete("/delete/:id",deleteSingleItem)
router.use(requireAuth);
router.post("/placed", placeOrder);

module.exports = router;
