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
    category: {
        type: String,
        enum: ["restaurant", "place", "bar/pub", "none"],
        default: "none",
      },
    img: {
        type: String,
    },
    place_name: {
        type: String,
    },
    belongTo: {
        type: String,
    },
    belongToTrip: {
        type: String,
    }
})

module.exports = mongoose.model("Review", reviewSchema);