const mongoose = require("mongoose");

const classificationScale = mongoose.Schema({
  idLevel: {
    type: String,
    require: true,
    //default: 'NT1'
  },
  level: {
    type: Number,
    require: true,
    //default: 1,2,...
  },
  nameLevel: {
    type: String,
    require: true,
    //default: Nhớ, Hiểu, ...
  },
  discription: {
    type: String,
    require: true,
    //default: 'Là khả năng ghi nhận và truy xuất lại các kiến thức, thông tin đã tiếp nhận; thể hiện qua việc có thể nhắc lại các kiến thức, thông tin đó.'
  },
  idOutputType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OutputType',
    required: true,
    //default: '654b72698ba535dccbb0f7be'
  }
})

module.exports = mongoose.model('ClassificationScale', classificationScale);