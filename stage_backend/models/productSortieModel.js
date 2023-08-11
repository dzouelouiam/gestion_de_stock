const mongoose = require("mongoose");

const productSortieSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantitySortie: {
      type: Number,
      required: [true, "Veuillez ajouter une quantité de sortie"],
    },
    destination: {
      type: String,
      required: [true, "Veuillez ajouter une destination"],
      enum: ["fournisseur", "marché"],
    },
    dateSortie: {
      type: Date,
      required: [true, "Veuillez ajouter une date de sortie"],
    },
  },
  {
    timestamps: true,
  }
);

const ProductSortie = mongoose.model("ProductSortie", productSortieSchema);
module.exports = ProductSortie;
