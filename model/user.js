const { default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        // require:true
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/147/147142.png"
    },
    role: {
        type: String,
        // required: true,
        enum: ['user', 'admin']
    },
    isPremium: false
})

module.exports = mongoose.model("User", userSchema);