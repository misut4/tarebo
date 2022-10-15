const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    belongTo: {
        type: ObjectId,
        ref: "Trip"
    }
})

mongoose.model("Expense", expenseSchema);