const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripDetails: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Trip", tripSchema);
