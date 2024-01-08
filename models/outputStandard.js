const mongoose = require("mongoose");

const outputStandard = mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      //default: "Nắm vững kiến thức nền tảng về khoa học tự nhiên, khoa học xã hội và hiểu khả năng vận dụng những kiến thức đó vào ngành Kỹ thuật Phần mềm và thực tiễn."
    },
    content: {
      type: String,
    },
    type: {
      type: String,
      enum: ['awareness', 'skill', 'attitude'],
      default: 'awareness',
    },
    // idOutputType: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "OutputType",
    //   require: true,
    //   //default: 654b6d66a5a010e43ca8c974
    // },
    idUserLatestEdit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listIdUserEdited: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OutputStandard", outputStandard);
