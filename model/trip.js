const { default: mongoose } = require("mongoose");
const tripSchema = new mongoose.Schema({
    tile: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
    },
})

mongoose.model("Trip", tripSchema);