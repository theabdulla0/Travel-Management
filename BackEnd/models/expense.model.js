const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Expense must be associated with a trip"],
    },

    title: {
      type: String,
      required: [true, "Expense title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    amount: {
      type: Number,
      required: [true, "Expense amount is required"],
      min: [0, "Expense amount cannot be negative"],
    },

    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      match: [/^[A-Z]{3}$/, "Currency must be a 3-letter code"],
    },

    category: {
      type: String,
      required: [true, "Expense category is required"],
      enum: [
        "Accommodation",
        "Food",
        "Transport",
        "Activities",
        "Shopping",
        "Miscellaneous",
      ],
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Who paid the expense is required"],
    },

    splitWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], 

    date: {
      type: Date,
      required: [true, "Expense date is required"],
      default: Date.now,
    },

    receiptUrl: {
      type: String, // optional link to receipt image
    },

    isSettled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
