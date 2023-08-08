const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {createProduct, getAllProducts, deleteProduct } = require("../controllers/productController");


router.post("/addProduct", protect, createProduct);
router.get("/getAllProduct", protect, getAllProducts);
router.delete("/deleteProduct", protect, deleteProduct);


module.exports = router;