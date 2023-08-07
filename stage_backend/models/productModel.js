const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Veuillez ajouter un nom"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Veuillez ajouter une catégorie"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Veuillez ajouter une quantité"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Veuillez ajouter une description"],
      trim: true,
    },
    source: {
        type: String,
        enum: ["fournisseur","marché"]
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;