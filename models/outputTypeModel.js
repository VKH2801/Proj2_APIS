const mongoose = require("mongoose");

const outputType = mongoose.Schema({
  id: {
    type: Number,
    require: true,
    //default: 1, 2, 3, ...
  },
  title: {
    type: String,
    require: true,
    //default: 'Về Nhận thức', 'Về kỹ năng', 'Về thái độ'.
  }
}, { timestamps: true })

module.exports = mongoose.model("OutputType", outputType);