const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const  Trip  = mongoose.model("Trip");
const reviewSchema = new mongoose.Schema({
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
        type: ObjectId,
        ref: User
    }
})

mongoose.model("Review", reviewSchema);