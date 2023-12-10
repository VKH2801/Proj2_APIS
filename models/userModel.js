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
            type: String,
            //default: 'male' | 'female',
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
        avatar: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);