const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, description, source } = req.body;
  const sourceEnum = ["fournisseur","marché"];
  if(!sourceEnum.includes(source))
    throw new Error("Veuillez sélectionner fournisseur ou marché");
  // Validation
  if (!name || !category || !quantity || !description || !source) {
    res.status(400);
    throw new Error("Merci de remplir tous les champs");
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id, 
    name,
    category,
    source,
    quantity,
    description,
  });

  res.status(201).json(product);
});

//get product
const getAllProducts = asyncHandler(async (req, res) => {
    // Find all products
    const products = await Product.find({});
  
    res.json(products);
  });
module.exports = { createProduct,getAllProducts };
