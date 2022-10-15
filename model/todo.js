const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        // required: true
    },
    belongTo: {
        type: ObjectId,
        ref: "Trip"
    }
})

module.exports = mongoose.model("Todo", todoSchema);