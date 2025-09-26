const mongoose = require("mongoose");

const budgetGoalSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
});

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Trip name is required"],
      trim: true,
      minlength: [3, "Trip name must be at least 3 characters"],
      maxlength: [100, "Trip name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    startDate: { type: Date, required: [true, "Start date is required"] },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return !this.startDate || value >= this.startDate;
        },
        message: "End date cannot be before start date",
      },
    },

    budgetGoals: {
      type: [budgetGoalSchema],
      default: [],
    },

    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      match: [/^[A-Z]{3}$/, "Currency must be a 3-letter code"],
    },

    totalBudget: {
      type: Number,
      min: [0, "Total budget cannot be negative"],
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: { type: Boolean, default: true },

    coverImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
