const mongoose = require("mongoose");

const referenceSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    //defualt: 'Thông tư số 08/2021/TT-BGDĐT ngày 18/3/2021 của Bộ giáo dục đào tạo về việc ban hành quy chế đào tạo trình độ đại học'.
  },
  domesticContent: {
    type: String,
    //default: 'content'
  },
  nonDomesticContent: {
    type: String,
    //default: 'content'
  },
  idUserLatestEdit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  listIdUserEdited: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

module.exports = mongoose.model('ReferenceDocument', referenceSchema)
