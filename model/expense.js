const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["restaurant", "place", "gas", "ticket", "none"],
    default: "none",
  },
  belongTo: {
    type: String,
    ref: "Trip",
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
