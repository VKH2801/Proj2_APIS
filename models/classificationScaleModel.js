const mongoose = require("mongoose");

const classificationScale = mongoose.Schema({
  code: {
    type: String,
    require: true,
  },
  level: {
    type: Number,
    require: true,
    //default: 1,2,...
  },
  title: {
    type: String,
    require: true,
    //default: Nhớ, Hiểu, ...
  },
  discription: {
    type: String,
    require: true,
    //default: 'Là khả năng ghi nhận và truy xuất lại các kiến thức, thông tin đã tiếp nhận; thể hiện qua việc có thể nhắc lại các kiến thức, thông tin đó.'
  },
  type: {
    type: String,
    enum: ['awareness', 'skill', 'attitude'],
    default: 'awareness'
  },
  // idOutputType: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'OutputType',
  //   required: true,
  //   //default: '654b72698ba535dccbb0f7be'
  // },
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

module.exports = mongoose.model('ClassificationScale', classificationScale);