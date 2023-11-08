const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: 'user',
        },
        gender: {
            type: Boolean,
            default: true,
        },
        lastName: {
            type: String,
        },
        firstName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);