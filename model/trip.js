const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    startDate: {
        type: Date,
        // required: true
    },
    endDate: {
        type: Date,
        // required: true
    },
    createDate: {
        type: Date,
        // required: true,
    },
    belongTo: {
        type: String,
    }
})

module.exports = mongoose.model("Trip", tripSchema);