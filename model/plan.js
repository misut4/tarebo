const { default: mongoose } = require("mongoose");
const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place_id: {
        type: String,
        required: true
    }
})

mongoose.model("Plan", planSchema);