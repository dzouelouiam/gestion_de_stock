const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {createProduct, getAllProducts } = require("../controllers/productController");


router.post("/addProduct", protect, createProduct);
router.get("/getAllProduct", protect, getAllProducts);


module.exports = router;