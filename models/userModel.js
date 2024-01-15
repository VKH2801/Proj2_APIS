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
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    gender: {
      type: String,
      //default: 'male' | 'female',
    },
    lastName: {
      type: String,
      default: ""
    },
    firstName: {
      type: String,
      default: ""
    },
    phoneNumber: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    },
    pdfData: {
      overview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Overview",
      },
      enroll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enroll",
      },
      outputType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OutputType",
      },
      classifyScale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassificationScale",
      },
      subjectCombination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubjectCombination",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
