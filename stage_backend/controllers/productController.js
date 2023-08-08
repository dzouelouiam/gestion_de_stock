const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
    const { name, category, quantity, description, source } = req.body;
    const sourceEnum = ['fournisseur', 'marché'];
    if (!sourceEnum.includes(source)) {
      res.status(400);
      throw new Error('Veuillez sélectionner fournisseur ou marché');
    }
  
    // Validation
    if (!name || !category || !quantity || !description || !source) {
      res.status(400);
      throw new Error('Merci de remplir tous les champs');
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



// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        res.status(404);
        throw new Error("Product not found");
      }
  
      res.json({ message: "Product removed" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const { name, category, quantity, description, source } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
  
      product.name = name || product.name;
      product.category = category || product.category;
      product.quantity = quantity || product.quantity;
      product.description = description || product.description;
      product.source = source || product.source;
  
      const updatedProduct = await product.save();
  
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

module.exports = {  createProduct,
                    getAllProducts,
                    deleteProduct,
                    updateProduct, };
