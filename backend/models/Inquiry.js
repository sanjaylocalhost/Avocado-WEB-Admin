const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    quantity: { type: String },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "resolved"],
      default: "pending",
    },
    adminNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
