const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const  Trip  = mongoose.model("Trip");
const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    like: {
        type: Number,
        // required: true
    },
    content: {
        type: String,
        // required: true
    },
    createDate: {
        type: Date,
        // required: true,
    },
    belongTo: {
        type: ObjectId,
        ref: Trip
    }
})

mongoose.model("Review", reviewSchema);