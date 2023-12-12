const mongoose = require("mongoose");

const outputType = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      //default: 'Về Nhận thức', 'Về kỹ năng', 'Về thái độ'.
    },
    content: {
      type: String,
    },
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

module.exports = mongoose.model("OutputType", outputType);
