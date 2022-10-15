const { default: mongoose } = require("mongoose");
const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

mongoose.model("Expense", expenseSchema);