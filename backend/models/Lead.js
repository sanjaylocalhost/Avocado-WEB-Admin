const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ["website", "referral", "social", "email", "call", "other"],
      default: "website",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "negotiation", "closed", "lost"],
      default: "new",
    },
    interest: {
      type: String,
      enum: ["seed", "plant", "both", "bulk", "consultation"],
    },
    notes: {
      type: String,
      trim: true,
    },
    assignedTo: {
      type: String,
      trim: true,
    },
    followUpDate: {
      type: Date,
    },
    lastContact: {
      type: Date,
    },
    productsInterested: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    interactionCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);