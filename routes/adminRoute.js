const router = require("express").Router();
const multer = require("multer");
const requireAuth = require("../middleware/requireAuth");
const { addItem,viewOrders } = require("../controllers/itemController");
const { addCoupon,viewCoupons } = require("../controllers/couponController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dnur3z7la",
  api_key: "317233934249263",
  api_secret: "RA4obr8RwK-mKD2n2UtBQvXfsrY",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
  },
});
const uploadMiddleware = multer({ storage });
router.use(requireAuth);
router.post("/add", uploadMiddleware.single("image"), addItem);
router.post("/addcoupon", addCoupon);
router.get("/vieworders", viewOrders);
router.get("/viewcoupons", viewCoupons);
module.exports = router;
