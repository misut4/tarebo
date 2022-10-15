const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const planSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    place_id: {
        type: String,
        // required: true
    },
    belongTo: {
        type: ObjectId,
        ref: "Trip"
    }
})

mongoose.model("Plan", planSchema);