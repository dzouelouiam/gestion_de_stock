const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {createProduct, getAllProducts, deleteProduct, updateProduct,
    createProductSortie, getAllProductSorties,getEntréeStatistics, getSortieStatistics, searchByCategory } = require("../controllers/productController");


router.post("/addProduct", protect, createProduct);
router.get("/getAllProduct", protect, getAllProducts);
router.delete("/deleteProduct/:id", protect, deleteProduct);
router.patch("/updateProduct/:id", protect, updateProduct);
router.post("/createProductSortie", protect, createProductSortie);
router.get("/getAllProductSorties", protect, getAllProductSorties);
router.get("/statistics/entrees", protect, getEntréeStatistics);
router.get("/statistics/sorties", protect,getSortieStatistics);
router.post("/searchByCategory",protect,searchByCategory);



module.exports = router;