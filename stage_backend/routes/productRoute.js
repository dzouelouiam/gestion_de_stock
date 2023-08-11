const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {createProduct, getAllProducts, deleteProduct, updateProduct,createProductSortie, getAllProductSorties} = require("../controllers/productController");


router.post("/addProduct", protect, createProduct);
router.get("/getAllProduct", protect, getAllProducts);
router.delete("/deleteProduct/:id", protect, deleteProduct);
router.patch("/updateProduct/:id", protect, updateProduct);
router.post("/createProductSortie", protect, createProductSortie);
router.get("/getAllProductSorties", protect, getAllProductSorties);




module.exports = router;