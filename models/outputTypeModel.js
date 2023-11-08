const mongoose = require("mongoose");

const outputType = mongoose.Schema({
  id: {
    type: Number,
    require: true,
    //default: 1,
  },
  title: {
    type: String,
    require: true,
    //default: 'Nhận thức',
  }
})

module.exports = mongoose.model("OutputType", outputType);