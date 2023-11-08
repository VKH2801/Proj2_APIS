const mongoose = require("mongoose");

const referenceSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
    //default: 1
  },
  content: {
    type: String,
    require: true,
    //defualt: 'Thông tư số 08/2021/TT-BGDĐT ngày 18/3/2021 của Bộ giáo dục đào tạo về việc ban hành quy chế đào tạo trình độ đại học'.
  },
  isDomesticContent: {
    type: Boolean,
    require: true,
    //default: false
  }
})

module.exports = mongoose.model('ReferenceDocument', referenceSchema)
