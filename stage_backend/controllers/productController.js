const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ProductSortie= require("../models/productSortieModel");


// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, description, source, customDate } = req.body;
  const sourceEnum = ['fournisseur', 'marché','magasin'];
  if (!sourceEnum.includes(source)) {
    res.status(400);
    throw new Error('Veuillez sélectionner fournisseur ou marché ou magasin');
  }

  // Validation
  if (!name || !category || !quantity || !description || !customDate) {
    res.status(400);
    throw new Error('Merci de remplir tous les champs');
  }

  // Extract day, month, and year from customDate string
  const [customYear, customMonth, customDay] = customDate.split('-');

  const isValidDay = Number.isInteger(Number(customDay)) && customDay >= 1 && customDay <= 31;
  const isValidMonth = Number.isInteger(Number(customMonth)) && customMonth >= 1 && customMonth <= 12;
  const isValidYear = Number.isInteger(Number(customYear)) && customYear >= 1900; // Adjust the range as needed

  if (!isValidDay || !isValidMonth || !isValidYear) {
    res.status(400);
    throw new Error('Date non valide');
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    category,
    source,
    quantity,
    description,
    customDate,
  });

  res.status(201).json(product);
});



//get product
const getAllProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1; 
  const itemsPerPage = 15;
  const skip = (page - 1) * itemsPerPage;

  const products = await Product.find({})
      .skip(skip)
      .limit(itemsPerPage);
      

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
    const { name, category, quantity, description, source, customDate } = req.body;

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
        product.customDate = customDate || product.customDate;

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
});


const createProductSortie = asyncHandler(async (req, res) => {
    const { product, quantitySortie, destination, dateSortie } = req.body;
  
    // Validation
    if (!product || !quantitySortie || !destination || !dateSortie) {
      res.status(400);
      throw new Error("Merci de remplir tous les champs pour la sortie de produit");
    }
  
    // Create ProductSortie
    const productSortie = await ProductSortie.create({
      product,
      quantitySortie,
      destination,
      dateSortie,
    });
  
    // Update corresponding Product's quantity
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      res.status(404);
      throw new Error("Product not found");
    }
  
    existingProduct.quantity -= quantitySortie;
    await existingProduct.save();
  
    console.log(productSortie)
    res.status(201).json(productSortie);
    
  });
  
//getAllProductSorties
  const getAllProductSorties = asyncHandler(async (req, res) => {
    const productSorties = await ProductSortie.find({}).populate("product");
  
    res.json(productSorties);
  });

  //getEntréeStatistics
  const getEntréeStatistics = asyncHandler(async (req, res) => {
    try {
      const totalEntrées = await Product.countDocuments();
      const totalEntréeQuantity = await Product.aggregate([
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: { $toInt: "$quantity" } }
          }
        }
      ]);
  
      res.json({
        totalEntrées,
        totalEntréeQuantity: totalEntréeQuantity.length > 0 ? totalEntréeQuantity[0].totalQuantity : 0
      });
    } catch (error) {
      console.error("Error fetching product entry statistics:", error);
      res.status(500).json({ message: "Failed to fetch product entry statistics" });
    }
  });
// Get product exit statistics
const getSortieStatistics = asyncHandler(async (req, res) => {
    try {
      const totalSorties = await ProductSortie.countDocuments();
      const totalSortieQuantity = await ProductSortie.aggregate([
        {
          $group: {
            _id: null,
            totalQuantitySortie: { $sum: "$quantitySortie" }
          }
        }
      ]);
  
      res.json({
        totalSorties,
        totalSortieQuantity: totalSortieQuantity.length > 0 ? totalSortieQuantity[0].totalQuantitySortie : 0
      });
    } catch (error) {
      console.error("Error fetching product sortie statistics:", error);
      res.status(500).json({ message: "Failed to fetch product sortie statistics" });
    }
  });

//Search by category
const searchByCategory = asyncHandler(async(req,res)=>{

  const category = req.body.category;
  if(!category){
     res.status(400);
     throw new Error("Veuillez specifier cette catégorie");
  }

  const products = await Product.find({ category });
  res.json(products);
  
});

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    createProductSortie,
    getAllProductSorties,
    getEntréeStatistics,
    getSortieStatistics,
    searchByCategory,

};
