const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const  User  = mongoose.model("User");
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
        type: ObjectId,
        ref: User
    }
})

mongoose.model("Trip", tripSchema);