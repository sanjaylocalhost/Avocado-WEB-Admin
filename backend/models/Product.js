// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//       trim: true,
//     },
//     category: {
//       type: String,
//       enum: ["seed", "plant"],
//       required: [true, "Category is required"],
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },
//     features: {
//       type: [String],
//       default: [],
//     },
//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: 0,
//     },
//     unit: {
//       type: String,
//       default: "per unit",
//     },
//     image: {
//       type: String,
//       default: "",
//     },
//     stock: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);


// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["seed", "plant"], required: true },
  description: { type: String, required: true },
  features: [String],
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String, default: "" }, // Store the image URL
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);